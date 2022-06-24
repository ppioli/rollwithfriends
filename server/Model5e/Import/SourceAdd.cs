namespace RollWithFriends.Models.Import;

public class SourceAdd
{
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string? ShortName { get; set; }

    private protected SourceAdd()
    {
        
    }
    
    public SourceAdd(string name, string description, string shortName)
    {
        Name = name;
        Description = description;
        ShortName = shortName;
    }
}