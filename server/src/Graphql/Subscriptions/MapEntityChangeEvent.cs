using Server.EFModels;
using Server.EFModels.Map;

namespace Server.Graphql.Subscriptions;

public class MapEntityChangeMessage : ChangeMessage<List<MapEntity>>
{
    public MapEntityChangeMessage(ChangeMessageType type, Guid userId, List<MapEntity> payload) : base(type, userId, payload)
    {
    }
}