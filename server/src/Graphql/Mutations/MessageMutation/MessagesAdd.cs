namespace Server.Graphql.Mutations.MessageMutation;

public class MessagesAdd<T>
{
    [ID]
    public int CampaignId { get; set; }

    public ICollection<T> Messages { get; set; } = null!;
}