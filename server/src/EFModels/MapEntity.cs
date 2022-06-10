namespace Server.EFModels;

using AutoMapper;
using Services;


/// <summary>
/// Represents something on the table
/// </summary>
[Node]
public class MapEntity
{
    [ID]
    public int Id { get; set; }
    public int X { get; set; }
    public int Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }

    public virtual Scene Scene { get; set; } = null!;
    public int SceneId { get; set; }
    
    [GraphQLIgnore]
    public virtual AppFile Image { get; set; }
    public int ImageId { get; set; }

    public string Href => $"/images/token/{Id}"; 
    
    public static MapEntity Get(int id)
    {
        throw new NotImplementedException();
    }

    protected MapEntity()
    {
        
    }
    
    public MapEntity(int x, int y, int width, int height, int sceneId, AppFile image)
    {
        X = x;
        Y = y;
        Width = width;
        Height = height;
        SceneId = sceneId;
        Image = image;
    }
}