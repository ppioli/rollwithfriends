namespace Server.EFModels;

public class AppFile
{
    public int Id { get; set; }

    public virtual User Owner { get; set; } = default!;
    public string OwnerId { get; set; }
    
    public string Subdirectory { get; set; }
    public string Type { get; set; }

    protected AppFile()
    {
        OwnerId = "";
        Subdirectory = "subdirectory";
        Type = "";
    }

    public AppFile(string ownerId, string subdirectory, string type)
    {
        OwnerId = ownerId;
        Subdirectory = subdirectory;
        Type = type;
    }
}