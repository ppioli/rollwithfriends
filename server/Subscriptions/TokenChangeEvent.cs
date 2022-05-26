using server.Models.Map;

namespace server.Subscriptions;

public class TokenChangeEvent
{
    public int Id { get; set; }
    public TokenChangeEventType Type { get; set; } = default!;
    public TokenPayload? Payload { get; set; } = default!;

    public static TokenChangeEvent Added( TokenPayload payload )
    {
        return new TokenChangeEvent()
        {
            Id = payload.Id,
            Payload = payload,
            Type = TokenChangeEventType.Added,
        };
    }
    
    public static TokenChangeEvent Updated( TokenPayload payload )
    {
        return new TokenChangeEvent()
        {
            Id = payload.Id,
            Payload = payload,
            Type = TokenChangeEventType.Updated,
        };
    }
    public static TokenChangeEvent Deleted( int id )
    {
        return new TokenChangeEvent()
        {
            Id = id,
            Type = TokenChangeEventType.Deleted,
        };
    }
    
}

public enum TokenChangeEventType
{
    Added,
    Updated,
    Deleted,
}