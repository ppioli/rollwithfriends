namespace Server.Graphql.Mutations.MessageMutation;

public class MessagesAdd<T>
{
    [ID]
    public Guid CampaignId { get; set; }

    [ID]
    public Guid? SceneId { get; set; }
    
    public ICollection<T> Messages { get; set; } = null!;
}