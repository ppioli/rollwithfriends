
namespace Server.EFModels.Map;


/// <summary>
/// Represents something on the table
/// </summary>
public class MapEntity
{
    [ID]
    public Guid Id { get; set; }
    
    public string Name { get; set; }
    
    public float X { get; set; } 
    public float Y { get; set; }
    
    public MapEntityContent Content { get; set; }

    public static MapEntity Create( string name, float x, float y, MapEntityContent content )
    {
        return new MapEntity()
        {
            Name = name,
            X = x,
            Y = y,
            Content = content
        };
    }
    
    protected MapEntity()
    {
        
    }
}