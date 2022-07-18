using Path = System.IO.Path;

namespace Server.EFModels;


public class Source
{
    [ID]
    public Guid Id { get; set; }
    
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;

    public string ShortName { get; set; } = null!;


    protected Source()
    {
        
    }
    
    public Source(string name, string description, string? shortName)
    {
        Name = name;
        Description = description;
        ShortName = shortName ?? CreateShortName();
    }

    public static Source Get()
    {
        throw new NotImplementedException();
    }

    public string GetSubdirectory( Guid owner)
    {
        return Path.Join(owner.ToString(), Id.ToString());
    }
    
    private string CreateShortName()
    {
        return string.Join("", Name.Split(' ').Select(s => s.First()));
    }
}