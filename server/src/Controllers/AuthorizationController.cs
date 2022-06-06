using System.Security.Claims;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using Server.EFModels;
using server.Infraestructure;
using Server.Services;

namespace server.Controllers;
/*
 * Licensed under the Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 * See https://github.com/openiddict/openiddict-core for more information concerning
 * the license and the contributors participating to this project.
 */

using static OpenIddictConstants;

public class AuthorizationController : Controller
{
    private readonly SignInManager<User> _signInManager;
    private readonly UserManager<User> _userManager;
    private readonly GoogleTokenValidator _googleTokenValidator;
    private readonly ILogger<AuthorizationController> _logger;

    public AuthorizationController(
        SignInManager<User> signInManager,
        UserManager<User> userManager,
        GoogleTokenValidator googleTokenValidator,
        ILogger<AuthorizationController> logger)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _googleTokenValidator = googleTokenValidator;
        _logger = logger;
    }

    [HttpPost("~/connect/token"), Produces("application/json")]
    public async Task<IActionResult> Exchange(CancellationToken ct)
    {
        // The middleware ensures that we have an OpenId request
        var request = HttpContext.GetOpenIddictServerRequest()!;
        if (request.IsPasswordGrantType())
        {
            var user = await _userManager.FindByNameAsync(request.Username);
            if (user == null)
            {
                return Forbid(
                    InvalidGrantProperties("The username/password couple is invalid."),
                    OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
            }

            // Validate the username/password parameters and ensure the account is not locked out.
            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: true);
            if (!result.Succeeded)
            {
                return Forbid(
                    InvalidGrantProperties("The username/password couple is invalid."),
                    OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
            }

            return await SignInAsync(user);
        }

        if (request.IsRefreshTokenGrantType())
        {
            // Retrieve the claims principal stored in the refresh token.
            var info = await HttpContext.AuthenticateAsync(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);

            // Retrieve the user profile corresponding to the refresh token.
            // Note: if you want to automatically invalidate the refresh token
            // when the user password/roles change, use the following line instead:
            // var user = _signInManager.ValidateSecurityStampAsync(info.Principal);
            var user = await _userManager.GetUserAsync(info.Principal);
            if (user == null)
            {
                return Forbid(
                    InvalidGrantProperties("The refresh token is no longer valid."),
                    OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
            }

            // Ensure the user is still allowed to sign in.
            if (!await _signInManager.CanSignInAsync(user))
            {
                return Forbid(
                    InvalidGrantProperties("The user is no longer allowed to sign in."),
                    OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
            }

            // Create a new ClaimsPrincipal containing the claims that
            // will be used to create an id_token, a token or a code.
            var principal = await _signInManager.CreateUserPrincipalAsync(user);

            foreach (var claim in principal.Claims)
            {
                claim.SetDestinations(GetDestinations(claim, principal));
            }

            return SignIn(principal, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
        }

        if (request.GrantType == AuthConstants.OpenIdTokenGrant)
        {
            if (request[AuthConstants.OpenIdTokenParameter]?.Value is not string authToken)
            {
                return Forbid(
                    InvalidGrantProperties(
                        $"The required parameter '{AuthConstants.OpenIdTokenParameter}' was not present"),
                    OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
            }

            ClaimsPrincipal? claims;
            try
            {
                claims = await _googleTokenValidator.Validate(authToken, ct);
            }
            catch (Exception)
            {
                return Forbid(
                    InvalidGrantProperties("The provided token was invalid"),
                    OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
            }
            

            var email = claims.FindFirstValue(ClaimTypes.Email);
            var firstname = claims.FindFirstValue(ClaimTypes.GivenName);
            var surname = claims.FindFirstValue(ClaimTypes.Surname);
            //TODO store the profile picture
            var picture = claims.FindFirstValue("picture");
            var emailVerified = claims.FindFirstValue("email_verified");
            var username = claims.FindFirstValue(ClaimTypes.NameIdentifier);

            if (emailVerified != "true")
            {
                //TODO Actually return an error
                throw new Exception("Email not verified");
            }

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                var result = await _userManager.CreateAsync(
                    new User()
                    {
                        UserName = username,
                        Email = email,
                        FirstName = firstname,
                        SurName = surname,
                        EmailConfirmed = true,
                    });

                if (!result.Succeeded)
                {
                    foreach (var identityError in result.Errors)
                    {
                        _logger.LogError(
                            "An error occurred while creating a new user: {Message}",
                            identityError.Description);
                    }
                }
            }

            user = await _userManager.FindByEmailAsync(email);

            return await SignInAsync(user);
        }


        throw new NotImplementedException("The specified grant type is not implemented.");
    }

    private async Task<IActionResult> SignInAsync(User user)
    {
        // Create a new ClaimsPrincipal containing the claims that
        // will be used to create an id_token, a token or a code.
        var principal = await _signInManager.CreateUserPrincipalAsync(user);

        // Set the list of scopes granted to the client application.
        // Note: the offline_access scope must be granted
        // to allow OpenIddict to return a refresh token.
        principal.SetScopes(
            new[]
            {
                Scopes.OpenId,
                Scopes.Email,
                Scopes.Profile,
                Scopes.OfflineAccess,
                Scopes.Roles
            });

        foreach (var claim in principal.Claims)
        {
            claim.SetDestinations(GetDestinations(claim, principal));
        }

        return SignIn(principal, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
    }

    private IEnumerable<string> GetDestinations(Claim claim, ClaimsPrincipal principal)
    {
        // Note: by default, claims are NOT automatically included in the access and identity tokens.
        // To allow OpenIddict to serialize them, you must attach them a destination, that specifies
        // whether they should be included in access tokens, in identity tokens or in both.
        switch (claim.Type)
        {
            case Claims.Name:
                yield return Destinations.AccessToken;

                if (principal.HasScope(Scopes.Profile))
                    yield return Destinations.IdentityToken;

                yield break;

            case Claims.Email:
                yield return Destinations.AccessToken;

                if (principal.HasScope(Scopes.Email))
                    yield return Destinations.IdentityToken;

                yield break;

            case Claims.Role:
                yield return Destinations.AccessToken;

                if (principal.HasScope(Scopes.Roles))
                    yield return Destinations.IdentityToken;

                yield break;

            // Never include the security stamp in the access and identity tokens, as it's a secret value.
            case "AspNet.Identity.SecurityStamp": yield break;

            default:
                yield return Destinations.AccessToken;
                yield break;
        }
    }

    private static AuthenticationProperties InvalidGrantProperties(string message)
    {
        var props = new Dictionary<string, string?>
        {
            [OpenIddictServerAspNetCoreConstants.Properties.Error] = Errors.InvalidGrant,
            [OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] = message,
        };
        var properties = new AuthenticationProperties(props);

        return properties;
    }
}