using Newtonsoft.Json;
using Server.EFModels.Map;
using server.Infraestructure;

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
    
    public string Name { get; set; }
    
    public int X { get; set; }
    public int Y { get; set; }

    public int Width => GetContent().Width;
    public int Height => GetContent().Height;

    [GraphQLIgnore]
    public virtual Scene Scene { get; set; } = null!;
    public int SceneId { get; set; }
    
    public MapEntityType Type { get; private set; }

    
    [GraphQLIgnore]
    public string Content { get; private set; }
    
    [UseProjection()]
    public IMapEntityContent GetContent()
    {
        return Type switch
        {
            MapEntityType.Image => JsonConvert.DeserializeObject<ImageContent>(Content),
            MapEntityType.Npc5E => JsonConvert.DeserializeObject<Npc5EContent>(Content),
            _ => throw new ArgumentOutOfRangeException()
        };
    }

    [GraphQLIgnore]
    public ImageContent GetImageContent()
    {
        if (Type != MapEntityType.Image)
        {
            throw new ClientException("Invalid object state");
        }
        
        return (GetContent() as ImageContent)!;
    }
    
    [GraphQLIgnore]
    public Npc5EContent GetNpc5EContent()
    {
        if (Type != MapEntityType.Npc5E)
        {
            throw new ClientException("Invalid object state");
        }
        
        return (GetContent() as Npc5EContent)!;
    }


    public void SetContent( ImageContent content)
    {
        Type = MapEntityType.Image;
        Content = JsonConvert.SerializeObject(content);
    }
    
    public void SetContent( Npc5EContent content)
    {
        Type = MapEntityType.Npc5E;
        Content = JsonConvert.SerializeObject(content);
    }

    public static MapEntity Get(int id)
    {
        throw new NotImplementedException();
    }

    protected MapEntity()
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
}

public enum ImageState
{
    Loaded,
    Loading,
    Missing
}