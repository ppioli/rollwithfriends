
using Server.Graphql.Types;

namespace Server.EFModels.Messages;

public class Message
{
    public Guid Id { get; set; }
    
    public Guid UserId { get; set; }
    
    public MessageContent Content { get; set; } = null!;

    public Guid CampaignId { get; set; }

    public DateTime CreatedAt { get; set; }
    
    public string SourceName { get; set; }
    
    public Guid? SourceId { get; set; }

    protected Message()
    {
    }

    public static Message Create(Guid userId, Guid? sourceId, Guid campaignId, string source, MessageContent content)
    {
        return new Message()
        {
            Content = content,
            UserId = userId,
            SourceId = sourceId,
            CampaignId = campaignId,
            SourceName = source,
            CreatedAt = DateTime.UtcNow,
        };
    }

}