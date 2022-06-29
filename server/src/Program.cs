using Api.Services;
using AspNetCore.Identity.Mongo;
using AspNetCore.Identity.Mongo.Model;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;
using OpenIddict.Abstractions;
using OpenIddict.Server;
using OpenIddict.Validation.AspNetCore;
using Quartz;
using Serilog;
using Server.EFModels;
using Server.EFModels.Map;
using Server.EFModels.Messages;
using Server.Graphql;
using Server.Graphql.Extension;
using Server.Graphql.Mutations;
using Server.Graphql.Query;
using Server.Graphql.Resolvers;
using Server.Graphql.Subscriptions;
using server.Infraestructure;
using Server.Services;


var builder = WebApplication
    .CreateBuilder(args);
BsonDefaults.GuidRepresentationMode = GuidRepresentationMode.V3;
BsonSerializer.RegisterSerializer(new GuidSerializer(GuidRepresentation.Standard));
var configuration = builder.Configuration;
var environment = builder.Environment;

var logger = new LoggerConfiguration()
    .ReadFrom.Configuration(configuration)
    .CreateLogger();







var dbContext = new RwfDbContext(configuration);

builder.Logging.ClearProviders();

builder.Logging.AddSerilog(logger);

builder.Services.AddSingleton(dbContext);



builder.Services.AddIdentityMongoDbProvider<ApplicationUser, ApplicationRole, Guid>(
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


builder.Services
    .AddGraphQLServer()
    // .AddSubscriptionType(e => e.Name("Subscription"))
    // .AddTypeExtension<MapEntityChangeSubscription>()
    // .AddTypeExtension<FileLoadingSubscription>()
    // .AddTypeExtension<MessageSubscription>()
    .AddQueryType<RootQuery>()
    
    //Mutation
    .AddMutationType(e => e.Name("Mutation"))
    .AddTypeExtension<CampaignMutation>()
    .AddTypeExtension<SceneMutations>()
    
    //Resolvers
    .AddTypeExtension<CampaignResolver>()
    .AddTypeExtension<SceneResolver>()
    // .AddTypeExtension<EnrollmentMutation>()
    // .AddTypeExtension<SceneMutations>()
    // .AddTypeExtension<SourceMutation>()
    // .AddTypeExtension<NonPlayerCharacterMutation>()
    // .AddType<TextMessageContent>()
    // .AddType<ImageContent>()
    // .AddType<Npc5EContent>()
    // .AddTypeExtension<Npc5EContentExtension>()
    .AddMutationConventions()
    .AddGlobalObjectIdentification()
    // Registers the filter convention of MongoDB
    .AddMongoDbFiltering()
    // Registers the sorting convention of MongoDB
    .AddMongoDbSorting()
    // Registers the projection convention of MongoDB
    .AddMongoDbProjections()
    // Registers the paging providers of MongoDB
    .AddMongoDbPagingProviders()
    .AddAuthorization()
    .AddMutationConventions(applyToAllMutations: true)
    .AddSocketSessionInterceptor<SocketSessionInterceptor>()
    .ModifyRequestOptions(
        opt =>
        {
            opt.IncludeExceptionDetails = builder.Environment.IsDevelopment();
        }) 
    .AddErrorFilter(
        error =>
        {
            logger.Error(error.Exception, "An unhandled error occurred. Message: {Message}",error.Message);

            return error;
        });

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


if (builder.Environment.IsDevelopment())
{
    var config = new MapperConfiguration(cfg => { cfg.AddMaps(typeof(Program)); });

    config.AssertConfigurationIsValid();
}


builder.Services
    .AddAutoMapper(typeof(Program));


builder.Services.AddServices();

var app = builder.Build();

// app.UseSerilogRequestLogging();
app.UseWebSockets();
app.UseCors();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
app.MapGraphQL();

app.Run();