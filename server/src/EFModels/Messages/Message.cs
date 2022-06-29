using System.Text.Json;
using Server.EFModels.Map;
using Server.EFModels.Messages.Roll;

namespace Server.EFModels.Messages;

[Node]
public class Message
{
    [ID]
    public int Id { get; set; }

    [GraphQLIgnore]
    public virtual ApplicationUser ApplicationUser { get; set; } = null!;

    [IsProjected]
    public string UserId { get; set; }

    [IsProjected(true)]
    public string Content { get; set; }

    public virtual Campaign Campaign { get; set; } = null!;
    public int CampaignId { get; set; }

    public DateTime CreatedAt { get; set; }

    public MessageType Type { get; set; }

    public virtual MapEntity? Source { get; set; }
    public int? SourceId { get; set; }

    public IMessageContent GetContent()
    {
        return Type switch
        {
            MessageType.Text => JsonSerializer.Deserialize<TextMessageContent>(Content)!,
            MessageType.Roll => JsonSerializer.Deserialize<RollMessageContent>(Content)!,
            _ => throw new ArgumentOutOfRangeException()
        };
    }


    private Message(string userId, int? sourceId, int campaignId, MessageType type, string content)
    {
        UserId = userId;
        Content = content;
        CampaignId = campaignId;
        SourceId = sourceId;
        CreatedAt = DateTime.UtcNow;
        Type = type;
    }

    public static Message CreateTextMessage(string userId, int? sourceId, int campaignId, TextMessageContent content)
    {
        return new Message(userId, sourceId, campaignId, MessageType.Text, JsonSerializer.Serialize(content));
    }

    public static Message CreateRollMessage(string userId, int? sourceId, int campaignId, RollMessageContent info)
    {
        return new Message(userId, sourceId, campaignId, MessageType.Roll, JsonSerializer.Serialize(info));
    }

    protected Message()
    {
        UserId = "";
        Content = "";
        CampaignId = 0;
    }

    public static Message Get()
    {
        throw new NotImplementedException();
    }
}