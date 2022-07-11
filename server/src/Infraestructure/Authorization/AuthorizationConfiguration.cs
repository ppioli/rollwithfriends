using AspNetCore.Identity.Mongo;
using Microsoft.AspNetCore.Identity;
using OpenIddict.Abstractions;
using Quartz;
using Server.EFModels;
using server.Infraestructure;

namespace Server.Infraestructure.Authentication;

public static class AuthorizationConfiguration
{
    public static IServiceCollection AddOidcServer(this IServiceCollection services, RwfDbContext dbContext)
    {
        services.AddIdentityMongoDbProvider<ApplicationUser, ApplicationRole, Guid>(
                mongo => { mongo.ConnectionString = dbContext.FullConnectionString; })
            .AddDefaultTokenProviders()
            .AddDefaultUI();


        // OpenIddict offers native integration with Quartz.NET to perform scheduled tasks
        // (like pruning orphaned authorizations/tokens from the database) at regular intervals.
        services.AddQuartz(
            options =>
            {
                options.UseMicrosoftDependencyInjectionJobFactory();
                options.UseSimpleTypeLoader();
                options.UseInMemoryStore();
            });

        // Register the Quartz.NET service and configure it to block shutdown until jobs are complete.
        services.AddQuartzHostedService(options => options.WaitForJobsToComplete = true);

        services.AddOpenIddict()

            // Register the OpenIddict core components.
            .AddCore(
                options =>
                {
                    // Configure OpenIddict to use the Entity Framework Core stores and models.
                    // Note: call ReplaceDefaultEntities() to replace the default OpenIddict entities.
                    options.UseMongoDb()
                        .UseDatabase(dbContext.Database);

                    // Enable Quartz.NET integration.
                    options.UseQuartz();
                })

            // Register the OpenIddict server components.
            .AddServer(
                options =>
                {
                    // Enable the authorization, logout, token and userinfo endpoints.
                    options.SetAuthorizationEndpointUris("/connect/authorize")
                        .SetLogoutEndpointUris("/connect/logout")
                        .SetTokenEndpointUris("/connect/token")
                        .SetUserinfoEndpointUris("/connect/userinfo");

                    // Mark the "email", "profile" and "roles" scopes as supported scopes.
                    options.RegisterScopes(
                        OpenIddictConstants.Permissions.Scopes.Email,
                        OpenIddictConstants.Permissions.Scopes.Profile,
                        OpenIddictConstants.Permissions.Scopes.Roles);

                    options.AcceptAnonymousClients();

                    // Note: this sample only uses the authorization code flow but you can enable
                    // the other flows if you need to support implicit, password or client credentials.
                    options.AllowAuthorizationCodeFlow();

                    // Register the signing and encryption credentials.
                    options.AddDevelopmentEncryptionCertificate()
                        .AddDevelopmentSigningCertificate();

                    // Register the ASP.NET Core host and configure the ASP.NET Core-specific options.
                    options.UseAspNetCore()
                        .DisableTransportSecurityRequirement() // TODO Only in development
                        .EnableAuthorizationEndpointPassthrough()
                        .EnableLogoutEndpointPassthrough()
                        .EnableTokenEndpointPassthrough()
                        .EnableUserinfoEndpointPassthrough()
                        .EnableStatusCodePagesIntegration();
                })

            // Register the OpenIddict validation components.
            .AddValidation(
                options =>
                {
                    // Import the configuration from the local OpenIddict server instance.
                    options.UseLocalServer();

                    // Register the ASP.NET Core host.
                    options.UseAspNetCore();
                });

        // Register the worker responsible for seeding the database.
        // Note: in a real world application, this step should be part of a setup script.
        services.AddHostedService<Worker>();

        return services;

        /*
         *
         * builder.Services.AddIdentityMongoDbProvider<ApplicationUser, ApplicationRole, Guid>(
    mongo =>
    {
        mongo.ConnectionString = dbContext.FullConnectionString;
    });



// Configure Identity to use the same JWT claims as OpenIddict instead
// of the legacy WS-Federation claims it uses by default (ClaimTypes),
// which saves you from doing the mapping in your authorization controller.
builder.Services.Configure<IdentityOptions>(
    options =>
    {
        options.ClaimsIdentity.UserNameClaimType = OpenIddictConstants.Claims.Name;
        options.ClaimsIdentity.UserIdClaimType = OpenIddictConstants.Claims.Subject;
        options.ClaimsIdentity.RoleClaimType = OpenIddictConstants.Claims.Role;
        options.ClaimsIdentity.EmailClaimType = OpenIddictConstants.Claims.Email;
    });

// OpenIddict offers native integration with Quartz.NET to perform scheduled tasks
// (like pruning orphaned authorizations/tokens from the database) at regular intervals.
builder.Services.AddQuartz(
    options =>
    {
        options.UseMicrosoftDependencyInjectionJobFactory();
        options.UseSimpleTypeLoader();
        options.UseInMemoryStore();
    });

// Register the Quartz.NET service and configure it to block shutdown until jobs are complete.
builder.Services.AddQuartzHostedService(options => options.WaitForJobsToComplete = true);

builder.Services.AddOpenIddict()

    // Register the OpenIddict core components.
    .AddCore(
        options =>
        {
            // Configure OpenIddict to use the Entity Framework Core stores and models.
            // Note: call ReplaceDefaultEntities() to replace the default OpenIddict entities.
            options.UseMongoDb()
                .UseDatabase( dbContext.Database);
            
            // Enable Quartz.NET integration.
            options.UseQuartz();
        })

    // Register the OpenIddict server components.
    .AddServer(
        options =>
        {
            // Enable the token endpoint.
            options.SetTokenEndpointUris("/connect/token");

            // Enable the password and the refresh token flows.
            options.AllowPasswordFlow()
                .AllowRefreshTokenFlow()
                .AllowCustomFlow(AuthConstants.OpenIdTokenGrant);

            options.DisableAccessTokenEncryption();
            // Accept anonymous clients (i.e clients that don't send a client_id).
            options.AcceptAnonymousClients();
            
            // Register the signing and encryption credentials.
            options.AddDevelopmentEncryptionCertificate()
                .AddDevelopmentSigningCertificate();

            // Register the ASP.NET Core host and configure the ASP.NET Core-specific options.
            options.UseAspNetCore()
                .DisableTransportSecurityRequirement()
                .EnableTokenEndpointPassthrough();
            
            // Register the event handler responsible for populating userinfo responses.
            options.AddEventHandler<OpenIddictServerEvents.ProcessRequestContext>(
                configuration =>
                {
                    configuration
                        .UseSingletonHandler<OidcExtractTokenHandler>();
                });

        })

    // Register the OpenIddict validation components.
    .AddValidation(
        options =>
        {
            // Import the configuration from the local OpenIddict server instance.
            options.UseLocalServer();
            
            // Register the ASP.NET Core host.
            options.UseAspNetCore();
        });

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme;
    options.DefaultScheme = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme;
});
         */
    }
}