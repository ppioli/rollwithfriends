using Server.EFModels;

namespace Server.Graphql.Subscriptions;

public class MapEntityChangeMessage : ChangeMessage<List<MapEntity>>
{
    public MapEntityChangeMessage(ChangeMessageType type, string userId, List<MapEntity> payload) : base(type, userId, payload)
    {
    }
}