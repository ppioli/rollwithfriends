using System.Security.Claims;
using server.Infraestructure;
using Server.Services;
using Path = System.IO.Path;

namespace Server.EFModels;

public class AppFile
{
    [ID]
    public Guid Id { get; set; }

    [ID]
    public Guid OwnerId { get; set; }
    
    [GraphQLIgnore]
    public string Subdirectory { private get; set; }

    [GraphQLIgnore]
    public string Extension { get; private set; }

    [GraphQLIgnore]
    public DateTime Created { get; set; }

    [GraphQLIgnore]
    public string RelativeFilePath => Path.Join(OwnerId.ToString(), Subdirectory, FileName);
    
    public string FileName => $"{Id}{Extension}";

    protected AppFile()
    {
        OwnerId = Guid.Empty;
        Subdirectory = string.Empty;
    }

    public static AppFile Create( string subdirectory, string extension,  ClaimsPrincipal user )
    {
        return new AppFile()
        {
            Id = Guid.NewGuid(),
            Subdirectory = subdirectory,
            OwnerId = user.GetId(),
            Extension = extension,
            Created = DateTime.UtcNow,
        };
    }
}