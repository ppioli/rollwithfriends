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


builder.Services.AddCors(options =>
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

app.MapGet("/", () => "Hello World!");

if( app.Environment.IsDevelopment()) {
{
    app.UseCors();    
}}



app.UseWebSockets();

app.MapGraphQL();

app.Run();
