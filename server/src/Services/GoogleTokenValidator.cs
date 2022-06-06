using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Polly;

namespace Server.Services;

public class GoogleTokenValidator
{
    private OpenIdConnectConfiguration? _configuration;
    private readonly JwtBearerOptions _options = new();
    private readonly ILogger<GoogleTokenValidator> _logger;
    private readonly IHttpContextAccessor _contextAccessor;

    public GoogleTokenValidator(
        IConfiguration configuration,
        ILogger<GoogleTokenValidator> logger,
        IHttpContextAccessor contextAccessor)
    {
        _logger = logger;
        _contextAccessor = contextAccessor;
        var configurator = new JwtBearerPostConfigureOptions();
        _options.Authority = configuration["Google:Authority"];
        _options.Audience = configuration["Google:Audience"];
        configurator.PostConfigure("", _options);
        // _configuration = new TokenValidationParameters()
        // {
        //     ValidAudience = configuration["Google:Issuer"],
        //     ValidIssuer = configuration["Google:Audience"],
        // };
    }

    public async Task<ClaimsPrincipal> Validate(string token, CancellationToken ct)
    {
        var validator = _options.SecurityTokenValidators.First();

        if (_configuration == null && _options.ConfigurationManager != null)
        {
            _configuration = await _options.ConfigurationManager.GetConfigurationAsync(ct);
        }

        var validationParameters = _options.TokenValidationParameters.Clone();
        if (_configuration != null)
        {
            var issuers = new[] { _configuration.Issuer };
            validationParameters.ValidIssuers = validationParameters.ValidIssuers?.Concat(issuers) ?? issuers;

            validationParameters.IssuerSigningKeys =
                validationParameters.IssuerSigningKeys?.Concat(_configuration.SigningKeys) ??
                _configuration.SigningKeys;
        }

        try
        {
            ClaimsPrincipal principal = validator.ValidateToken(token, validationParameters, out var _);
            
            _logger.LogDebug("Token validated");

            return principal;
        }
        catch (Exception ex)
        {
            _logger.LogInformation("Token validation failed. Cause: {Cause}", ex.Message);
            // Refresh the configuration for exceptions that may be caused by key rollovers. The user can also request a refresh in the event.
            if (_options.RefreshOnIssuerKeyNotFound &&
                _options.ConfigurationManager != null &&
                ex is SecurityTokenSignatureKeyNotFoundException)
            {
                _options.ConfigurationManager.RequestRefresh();
            }

            throw;
        }
    }
}