
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

    public float Width => Content.Width;
    public float Height => Content.Height;
    public bool Resizable => Content.Resizable;
    
    public IMapEntityContent Content { get; set; }

    public static MapEntity Create( string name, float x, float y, IMapEntityContent content )
    {
        return new MapEntity()
        {
            Id = Guid.NewGuid(),
            Name = name,
            X = x,
            Y = y,
            Content = content,
        };
    }
    
    protected MapEntity()
    {
        
    }
}