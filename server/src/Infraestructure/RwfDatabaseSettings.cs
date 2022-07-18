
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;
using Server.EFModels;
using Server.EFModels.Entries;
using Server.EFModels.Messages;

namespace server.Infraestructure;

public class RwfDbContext
{
    
    public readonly IMongoDatabase Database;
    
    public string ConnectionString { get; private set; }
    public string DatabaseName { get; set; }

    public string FullConnectionString => $"{ConnectionString}/{DatabaseName}";
    
    public RwfDbContext( IConfiguration configuration)
    {
        
        
        DatabaseName = configuration["RwfDatabase:DatabaseName"] ??
                               throw new Exception("RwfDatabase:DatabaseName required in conf");


        ConnectionString = configuration["RwfDatabase:ConnectionString"] ??
                           throw new Exception("RwfDatabase:ConnectionString required in conf");;
        
        var mongoConnectionUrl = new MongoUrl(ConnectionString);
        var mongoClientSettings = MongoClientSettings.FromUrl(mongoConnectionUrl);
        
        // mongoClientSettings.ClusterConfigurator = cb =>
        // {
        //     // This will print the executed command to the console
        //     cb.Subscribe<CommandStartedEvent>(e =>
        //     {
        //         _logger.LogInformation("Executing command {CommandName} - {Command}", e.CommandName, e.Command.ToJson());
        //     });
        // };
        var client = new MongoClient(mongoClientSettings);

        Database = client.GetDatabase(DatabaseName);
        
        BsonDefaults.GuidRepresentationMode = GuidRepresentationMode.V3;
        BsonSerializer.RegisterSerializer(new GuidSerializer(GuidRepresentation.Standard));
    }

    public IMongoCollection<ApplicationUser> Users => Database.GetCollection<ApplicationUser>("users");
    public IMongoCollection<Campaign> Campaigns => Database.GetCollection<Campaign>("campaigns");
    public IMongoCollection<Scene> Scenes => Database.GetCollection<Scene>("scenes");
    public IMongoCollection<Message> Messages => Database.GetCollection<Message>("messages");
    public IMongoCollection<IEntry> Entries => Database.GetCollection<IEntry>("entries");
}