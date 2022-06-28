using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using server.Infraestructure;
namespace Server.EFModels.Map;


/// <summary>
/// Represents something on the table
/// </summary>
[Node]
public class MapEntity
{
    [ID]
    public int Id { get; set; }
    
    public string Name { get; set; }
    
    public int X { get; set; }
    public int Y { get; set; }

    public int Width => Content.Width;
    public int Height => Content.Height;

    [GraphQLIgnore]
    [JsonIgnore]
    public virtual Scene Scene { get; set; } = null!;
    public int SceneId { get; set; }
    
    public MapEntityType Type { get; private set; }

    
    [GraphQLIgnore]
    [Column("Content")]
    public string ContentString {  get; private set; }
    
    [UseProjection()]
    public IMapEntityContent Content =>
    
         Type switch
        {
            MapEntityType.Image => JsonConvert.DeserializeObject<ImageContent>(ContentString)!,
            MapEntityType.Npc5E => JsonConvert.DeserializeObject<Npc5EContent>(ContentString)!,
            _ => throw new ArgumentOutOfRangeException()
        };
    

    [GraphQLIgnore]
    public ImageContent GetImageContent()
    {
        if (Type != MapEntityType.Image)
        {
            throw new ClientException("Invalid object state");
        }
        
        return (Content as ImageContent)!;
    }
    
    [GraphQLIgnore]
    public Npc5EContent GetNpc5EContent()
    {
        if (Type != MapEntityType.Npc5E)
        {
            throw new ClientException("Invalid object state");
        }
        
        return (Content as Npc5EContent)!;
    }


    public void SetContent( ImageContent content)
    {
        Type = MapEntityType.Image;
        ContentString = JsonConvert.SerializeObject(content);
    }
    
    public void SetContent( Npc5EContent content)
    {
        Type = MapEntityType.Npc5E;
        ContentString = JsonConvert.SerializeObject(content);
    }

    public static MapEntity Get(
        ClaimsPrincipal user,
        RwfDbContext context,
        [ID]int id)
    {
        
        return context.MapEntities
            .First(s => s.Id == id);

    }

    
    public MapEntity()
    {
        
    }
    
    public static MapEntity CreateImageContent(int x, int y, string name,  int sceneId, ImageContent content)
    {
        var ret = new MapEntity()
        {
            X = x,
            Y = y,
            Name = name,
            SceneId = sceneId
        };
        
        ret.SetContent(content);

        return ret;
    }
    
    public static MapEntity CreateNpcContent(int x, int y, string name,  int sceneId, Npc5EContent content)
    {
        var ret = new MapEntity()
        {
            X = x,
            Y = y,
            Name = name,
            SceneId = sceneId
        };
        
        ret.SetContent(content);

        return ret;
    }

    public void Resize(int width, int height)
    {
        if (Type == MapEntityType.Image)
        {
            var content = GetImageContent();
            content.Width = width;
            content.Height = height;

            SetContent(content);
        }
    }
}

public enum ImageState
{
    Loaded,
    Loading,
    Missing
}
