using Path = System.IO.Path;

namespace Server.EFModels;

public class AppFile
{
    public int Id { get; set; }

    [GraphQLIgnore]
    public virtual ApplicationUser Owner { get; set; } = default!;
    public Guid OwnerId { get; set; }
    
    public string Subdirectory { get; set; }
    public string Accepts { get; set; }
    
    public string? Extension { get; private set; }
    public string? ContentType { get; private set; }

    public bool Loaded => Extension != null && ContentType != null;
    
    public DateTime Created { get; set; }

    protected AppFile()
    {
        OwnerId = Guid.Empty;
        Subdirectory = "subdirectory";
        Accepts = "";
    }

    public AppFile(Guid ownerId, string subdirectory, string expectedType )
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