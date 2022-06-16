namespace Server.EFModels;

public class AppFile
{
    public int Id { get; set; }

    [GraphQLIgnore]
    public virtual User Owner { get; set; } = default!;
    public string OwnerId { get; set; }
    
    public string Subdirectory { get; set; }
    public string Type { get; set; }
    
    public bool Loaded { get; set; }
    
    public DateTime Created { get; set; }

    protected AppFile()
    {
        OwnerId = "";
        Subdirectory = "subdirectory";
        Type = "";
    }

    public AppFile(string ownerId, string subdirectory)
    {
        OwnerId = ownerId;
        Subdirectory = subdirectory;
        Created = DateTime.UtcNow;
        Type = "";
        Loaded = false;
    }
}