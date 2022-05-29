
using Api.EFModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OpenIddict.Abstractions;
using Quartz;
using Serilog;
using server.Infraestructure;
using Server.Mutations;
using Server.Query;
using Server.Services;
using Server.Subscriptions;



var builder = WebApplication
    .CreateBuilder(args);
    
var logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .CreateLogger();

builder.Logging.ClearProviders();

builder.Logging.AddSerilog(logger);

builder.Services
    .AddDbContext<RwfDbContext>(
        options =>
        {
            options
                .UseLazyLoadingProxies()
                .UseNpgsql( builder.Configuration.GetConnectionString("DefaultDatabase"));

            if ( builder.Environment.IsDevelopment())
            {
                options.EnableSensitiveDataLogging();
            }

            options.UseOpenIddict();
        });

// Register the Identity services.
builder.Services.AddIdentity<User, ApplicationRole>()
    .AddEntityFrameworkStores<RwfDbContext>()
    .AddDefaultTokenProviders();


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

        if ( builder.Configuration["Identity:RequireStrongPassword"] != "true")
        {
            // Default Password settings.
            options.Password.RequireDigit = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
            options.Password.RequiredLength = 4;
            options.Password.RequiredUniqueChars = 1;
        }
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
            options.UseEntityFrameworkCore()
                .UseDbContext<RwfDbContext>();

            // Enable Quartz.NET integration.
            options.UseQuartz();
            options.UseQuartz();
        })

    // Register the OpenIddict server components.
    .AddServer(
        options =>
        {
            // Register the ASP.NET Core host and configure the ASP.NET Core-specific options.
            options.UseAspNetCore()
                .DisableTransportSecurityRequirement()
                .EnableTokenEndpointPassthrough();

            // Enable the token endpoint.
            options.SetTokenEndpointUris("/connect/token");

            // Enable the password and the refresh token flows.
            options.AllowPasswordFlow()
                .AllowRefreshTokenFlow();

            options.DisableAccessTokenEncryption();
            // Accept anonymous clients (i.e clients that don't send a client_id).
            options.AcceptAnonymousClients();

            // Register the signing and encryption credentials.
            options.AddDevelopmentEncryptionCertificate()
                .DisableAccessTokenEncryption()
                .AddDevelopmentSigningCertificate();
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

builder.Services
    .AddGraphQLServer()
    .AddMutationConventions()
    .AddGlobalObjectIdentification()
    .AddFiltering()
    .AddSubscriptionType<Subscription>()
    .AddQueryType<RootQuery>()
    .AddMutationType<MapEntityMutation>();

builder.Services.AddInMemorySubscriptions();

builder.Services.AddControllers();

builder.Services.AddCors(
    options =>
    {
        options.AddDefaultPolicy(
            policy =>
            {
                policy
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin();
            });
    });


builder.Services
    .AddAutoMapper(typeof(Program));
    
builder.Services.AddSingleton<IMapEntityService, MapEntityService>();


var app = builder.Build();
// app.UseSerilogRequestLogging();
app.UseRouting();
app.MapGet("/", () => "Hello World!");


if (app.Environment.IsDevelopment())
{
    {
        app.UseCors();
    }
}

app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

app.UseWebSockets();

app.MapGraphQL();

app.Run();