using Server.EFModels;
using Server.Graphql.Dtos;
using Server.Models;

namespace Server.Subscriptions;

public class MapEntityChangeEvent
{
    public MapEntityChangeEventType Type { get; set; } = default!;
    public MapEntityPayload? Payload { get; set; } = default!;

    public static MapEntityChangeEvent Added( MapEntityDto mapEntity )
    {
        return new MapEntityChangeEvent()
        {
            Payload = MapEntityPayload.Create(mapEntity),
            Type = MapEntityChangeEventType.Added,
        };
    }
    
    public static MapEntityChangeEvent Updated( MapEntityDto mapEntity )
    {
        return new MapEntityChangeEvent()
        {
            Payload = MapEntityPayload.Create(mapEntity),
            Type = MapEntityChangeEventType.Updated,
        };
    }
    public static MapEntityChangeEvent Deleted( int id )
    {
        return new MapEntityChangeEvent()
        {
            Type = MapEntityChangeEventType.Deleted,
        };
    }
    
}

public enum MapEntityChangeEventType
{
    Added,
    Updated,
    Deleted,
}