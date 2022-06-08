namespace Server.Graphql.Subscriptions;

public class ChangeMessage<T>
{
    public ChangeMessage(ChangeMessageType type, string userId, T payload)
    {
        Type = type;
        UserId = userId;
        Payload = payload;
    }

    public ChangeMessageType Type { get; set; }
    public string UserId { get; set; }
    public T Payload { get; set; }
}