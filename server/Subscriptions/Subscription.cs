namespace Server.Subscriptions;

public class Subscription
{
    [Subscribe]
    [Topic(nameof(TokenChangeEvent))]
    public TokenChangeEvent TokenChange([EventMessage] TokenChangeEvent payload) => payload;
}