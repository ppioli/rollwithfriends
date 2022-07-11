namespace Server.Graphql.Mutations.MapEntityMutation.Image;

public class MapEntitiesImageAdd
{
    [ID]
    public Guid SceneId { get; set; }

    public MapEntityImageAdd[] Entities { get; set; } = default!;
}

public class MapEntityImageAdd
{
    public string Name { get; set; } = null!;
    public int X { get; set; }
    public int Y { get; set; }
    public Guid UploadId { get; set; }
    public string FileName { get; set; } = null!;
    public int Width { get; set; }
    public int Height { get; set; }
}