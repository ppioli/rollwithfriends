using AutoMapper;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using Serilog;
using Server.EFModels;
using Server.EFModels.Entries;
using Server.EFModels.Map;
using Server.EFModels.Messages;
using Server.EFModels.Messages.Roll;
using Server.Graphql;
using Server.Graphql.Mutations;
using Server.Graphql.Mutations.MapEntityMutation;
using Server.Graphql.Mutations.MapEntityMutation.Image;
using Server.Graphql.Mutations.MessageMutation;
using Server.Graphql.Query;
using Server.Graphql.Resolvers;
using Server.Graphql.Types;
using server.Infraestructure;
using Server.Infraestructure;
using Server.Infraestructure.Authentication;
using Server.Services;

var builder = WebApplication
    .CreateBuilder(args);

var configuration = builder.Configuration;
var environment = builder.Environment;

var dbContext = new RwfDbContext(configuration);


var logger = new LoggerConfiguration()
    .ReadFrom.Configuration(configuration)
    .CreateLogger();



builder.Logging.ClearProviders();

builder.Logging.AddSerilog(logger);

builder.Services.AddSingleton(dbContext);

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

builder.Services.AddOidcServer(dbContext);

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
    .AddTypeExtension<UserMutation>()
    .AddTypeExtension<EnrollmentMutation>()
    .AddTypeExtension<MessageMutation>()
    .AddTypeExtension<MapEntityMutation>()
    .AddTypeExtension<NonPlayerCharacterMutation>()
    .AddTypeExtension<MapEntityImageMutation>()
    // .AddTypeExtension<SourceMutation>()
    // Types
    .AddType<UserType>()
    .AddTypeExtension<CampaignType>()
    .AddTypeExtension<SceneType>()
    .AddTypeExtension<MapEntityType>()
    .AddTypeExtension<UserType>()
    .AddTypeExtension<MessageType>()
    // .AddTypeExtension<NonPlayerCharacterMutation>()
    // .AddType<TextMessageContent>()
    .AddType<ImageContent>()
    .AddType<Npc5EContent>()
    .AddType<RollMessageContent>()
    .AddType<TextMessageContent>()
    .AddType<Npc5E>()
    // .AddTypeExtension<Npc5EContentExtension>()
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
    //Services
    .RegisterService<RwfDbContext>()
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
app.UseMiddleware<ExceptionMiddleware>();
// app.UseSerilogRequestLogging();
app.UseWebSockets();
app.UseCors();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapDefaultControllerRoute();
    endpoints.MapRazorPages();
});

app.MapGraphQL();

app.Run();