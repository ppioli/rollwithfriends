namespace Server.Graphql.Mutations.MapEntityMutation;


public class MapEntitiesPositionUpdate
{
    [ID]
    public int SceneId { get; set; }

    public MapEntityPositionUpdate[] Entities { get; set; } = default!;
}

public class MapEntityPositionUpdate
{
    [ID]
    public int Id { get; set; }

    public int X { get; set; }
    public int Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
}