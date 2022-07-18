using Server.EFModels;
using Server.EFModels.Map;

namespace Server.Graphql.Mutations.MapEntityMutation;


public class MapEntitiesPositionUpdate
{
    [ID]
    public Guid SceneId { get; set; }

    public MapEntityPositionUpdate[] Entities { get; set; } = default!;
}

public class MapEntityPositionUpdate
{
    [ID]
    public Guid Id { get; set; }

    public int X { get; set; }
    public int Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }

    public void Apply(MapEntity entity)
    {
        entity.X = X;
        entity.Y = Y;

        if (entity.Content.Resizable)
        {
            entity.Content.Resize(Width, Height);
        }
    }
}