using Path = System.IO.Path;

namespace Server.EFModels;

public class AppFile
{
    public int Id { get; set; }

    [GraphQLIgnore]
    public virtual User Owner { get; set; } = default!;
    public string OwnerId { get; set; }
    
    public string Subdirectory { get; set; }
    public string Accepts { get; set; }
    
    public string? Extension { get; private set; }
    public string? ContentType { get; private set; }

    public bool Loaded => Extension != null && ContentType != null;
    
    public DateTime Created { get; set; }

    protected AppFile()
    {
        OwnerId = "";
        Subdirectory = "subdirectory";
        Accepts = "";
    }

    public AppFile(string ownerId, string subdirectory, string expectedType )
    {
        OwnerId = ownerId;
        Subdirectory = subdirectory;
        Created = DateTime.UtcNow;
        Accepts = expectedType;
    }

    public void SetLoaded(string extension, string contentType)
    {
        Extension = extension;
        ContentType = contentType;
    }
}