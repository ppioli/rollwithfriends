namespace RollWithFriends.Models;

public class Source
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string? ShortName { get; set; }

    private protected Source()
    {
        
    }
    
    public Source(string name, string description, string shortName)
    {
        Name = name;
        Description = description;
        ShortName = shortName;
    }
}