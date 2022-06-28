
using MongoDB.Driver;
using Server.EFModels;

namespace server.Infraestructure;

public class RwfDbContext
{
    
    public readonly IMongoDatabase Database;
    
    public string ConnectionString { get; private set; }
    
    public RwfDbContext( IConfiguration configuration)
    {
        
        var connectionString = configuration["RwfDatabase:ConnectionString"] ??
                               throw new Exception("RwfDatabase:ConnectionString required in conf");


        ConnectionString = connectionString;
        
        var mongoConnectionUrl = new MongoUrl(ConnectionString);
        var mongoClientSettings = MongoClientSettings.FromUrl(mongoConnectionUrl);
        
        
// comment this line below if your mongo doesn't run on secured mode
        
        
        // mongoClientSettings.ClusterConfigurator = cb =>
        // {
        //     // This will print the executed command to the console
        //     cb.Subscribe<CommandStartedEvent>(e =>
        //     {
        //         _logger.LogInformation("Executing command {CommandName} - {Command}", e.CommandName, e.Command.ToJson());
        //     });
        // };
        var client = new MongoClient(mongoClientSettings);

        Database = client.GetDatabase("rollwithfriends");
    }

    public IMongoCollection<User> Users => Database.GetCollection<User>("users");
}