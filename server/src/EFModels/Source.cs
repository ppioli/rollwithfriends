using Path = System.IO.Path;

namespace Server.EFModels;

[Node]
public class Source
{
    [ID]
    public int Id { get; set; }
    
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;

    public string ShortName { get; set; } = null!;

    public string OwnerId { get; set; } = null!;
    
    [GraphQLIgnore]
    public virtual User Owner { get; set; } = null!;

    protected Source()
    {
        
    }
    
    public Source(string ownerId, string name, string description, string? shortName)
    {
        Name = name;
        OwnerId = ownerId;
        Description = description;
        ShortName = shortName ?? CreateShortName();
    }

    public static Source Get()
    {
        throw new NotImplementedException();
    }

    public string GetSubdirectory()
    {
        return Path.Join(OwnerId, Id.ToString());
    }
    
    private string CreateShortName()
    {
        return string.Join("", Name.Split(' ').Select(s => s.First()));
    }
}