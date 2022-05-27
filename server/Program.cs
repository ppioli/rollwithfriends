using Server.Mutations;
using Server.Query;
using Server.Services;
using Server.Subscriptions;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddGraphQLServer()
    .AddMutationConventions()
    .AddGlobalObjectIdentification()
    .AddFiltering()
    .AddSubscriptionType<Subscription>()
    .AddQueryType<RootQuery>()
    .AddMutationType<TokenMutation>();

builder.Services.AddInMemorySubscriptions();


builder.Services
    .AddAutoMapper(typeof(Program));

builder.Services.AddSingleton<ITokenService, TokenService>();


var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.UseWebSockets();

app.MapGraphQL();

app.Run();