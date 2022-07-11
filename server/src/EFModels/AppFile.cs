using System.Security.Claims;
using server.Infraestructure;
using Server.Services;
using Path = System.IO.Path;

namespace Server.EFModels;

public class AppFile
{
    public Guid Id { get; set; }

    public Guid OwnerId { get; set; }
    
    public string Subdirectory { get; set; }

    public string Extension { get; private set; }

    public DateTime Created { get; set; }

    protected AppFile()
    {
        OwnerId = Guid.Empty;
        Subdirectory = "subdirectory";
    }

    public static AppFile Create( string subdirectory, string extension,  ClaimsPrincipal user )
    {
        return new AppFile()
        {
            Subdirectory = $"{user.GetId()}/{subdirectory}",
            OwnerId = user.GetId(),
            Extension = extension,
            Created = DateTime.UtcNow,
        };
    }
}