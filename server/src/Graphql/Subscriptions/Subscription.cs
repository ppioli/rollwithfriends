namespace Server.Subscriptions;

public class Subscription
{
    [Subscribe]
    [Topic(nameof(MapEntityChangeEvent))]
    public MapEntityChangeEvent MapEntitySubscription([EventMessage] MapEntityChangeEvent payload) => payload;
}