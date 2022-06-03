using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Serilog;
using server.Infraestructure;
using Server.Mutations;
using Server.Query;
using Server.Services;
using Server.Subscriptions;


var builder = WebApplication
    .CreateBuilder(args);

var configuration = builder.Configuration;
var environment = builder.Environment;

var logger = new LoggerConfiguration()
    .ReadFrom.Configuration(configuration)
    .CreateLogger();

builder.Logging.ClearProviders();

builder.Logging.AddSerilog(logger);

builder.Services
    .AddDbContext<RwfDbContext>(
        options =>
        {
            options
                .UseLazyLoadingProxies()
                .UseNpgsql(configuration.GetConnectionString("DefaultDatabase"));

            if (environment.IsDevelopment())
            {
                options.EnableSensitiveDataLogging();
            }

            options.UseOpenIddict();
        });


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearerConfiguration(
        configuration["Jwt:Issuer"],
        configuration["Jwt:Audience"]
    );


builder.Services
    .AddGraphQLServer()
    .RegisterDbContext<RwfDbContext>()
    .AddSubscriptionType<Subscription>()
    .AddQueryType<RootQuery>()
    .AddMutationType(e => e.Name("Mutation"))
    .AddTypeExtension<CampaignMutation>()
    .AddTypeExtension<EnrollmentMutation>()
    .AddTypeExtension<MapEntityMutation>()
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
app.UseCors();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
app.MapGraphQL();

app.Run();