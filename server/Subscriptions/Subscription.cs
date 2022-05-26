using server.Models.Map;

namespace server.Subscriptions;

public class Subscription
{
    [Subscribe]
    [Topic(nameof(TokenChangeEvent))]
    public TokenChangeEvent TokenChange([EventMessage] TokenChangeEvent payload) => payload;
}