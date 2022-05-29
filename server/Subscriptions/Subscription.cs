namespace Server.Subscriptions;

public class Subscription
{
    [Subscribe]
    [Topic(nameof(MapEntityChangeEvent))]
    public MapEntityChangeEvent TokenChange([EventMessage] MapEntityChangeEvent payload) => payload;
}