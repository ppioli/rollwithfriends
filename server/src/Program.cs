using System.Text;
using Api.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Server.EFModels;
using server.Infraestructure;
using Server.Mutations;
using Server.Query;
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
                .UseNpgsql(builder.Configuration.GetConnectionString("DefaultDatabase"));

            if (builder.Environment.IsDevelopment())
            {
                options.EnableSensitiveDataLogging();
            }

            options.UseOpenIddict();
        });


builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options => { options.LoginPath = "/account/login"; })
    .AddGoogle(
        googleOptions =>
        {
            googleOptions.ClientId = builder.Configuration["Google:ClientId"];
            googleOptions.ClientSecret = builder.Configuration["Google:ClientSecret"];
        });

builder.Services.AddOpenIddict()

    // Register the OpenIddict core components.
    .AddCore(options =>
    {
        // Configure OpenIddict to use the EF Core stores/models.
        options.UseEntityFrameworkCore()
            .UseDbContext<RwfDbContext>();
    })

    // Register the OpenIddict server components.
    .AddServer(options =>
    {
        options
            .AllowClientCredentialsFlow();
        
        options
            .SetAuthorizationEndpointUris("/connect/authorize")
            .SetTokenEndpointUris("/connect/token");


        // Encryption and signing of tokens
        options
            .AddEphemeralEncryptionKey()
            .AddEphemeralSigningKey();

        // Register scopes (permissions)
        options.RegisterScopes("api");

        // Register the ASP.NET Core host and configure the ASP.NET Core-specific options.
        options
            .UseAspNetCore()
            .EnableTokenEndpointPassthrough()
            .EnableAuthorizationEndpointPassthrough();          
    });

builder.Services
    .AddGraphQLServer()
    .RegisterDbContext<RwfDbContext>()
    .AddSubscriptionType<Subscription>()
    .AddQueryType<RootQuery>()
    .AddMutationType(e => e.Name("Mutation"))
    .AddTypeExtension<CampaignMutation>()
    .AddTypeExtension<EnrollmentMutation>()
    .AddProjections()
    .AddFiltering()
    .AddMutationConventions()
    .AddGlobalObjectIdentification()
    .AddAuthorization();

builder.Services.AddInMemorySubscriptions();

builder.Services.AddControllersWithViews();


if (builder.Environment.IsDevelopment())
{
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
}



builder.Services
    .AddAutoMapper(typeof(Program));

builder.Services.AddServices();

var app = builder.Build();

await app.InitializeDatabase();
// app.UseSerilogRequestLogging();
app.UseWebSockets();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors();

app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
app.MapGraphQL();

app.Run();