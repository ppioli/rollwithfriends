using System.Text.Json;

namespace Server.EFModels.Messages;

[Node]
public class Message
{
    [ID]
    public int Id { get; set; }

    [GraphQLIgnore]
    public virtual User User { get; set; } = null!;
    
    [IsProjected]
    public string UserId { get; set; }
    
    [IsProjected(true)]
    public string Content { get; set; }

    public virtual Campaign Campaign { get; set; } = null!;
    public int CampaignId { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public MessageType Type { get; set; }

    public IMessageContent GetContent()
    {
        return Type switch
        {
            MessageType.Text => new TextMessageContent() { Text = Content },
            MessageType.Roll => new RollMessageContent() { Rolls = JsonSerializer.Deserialize<List<Roll>>(Content) },
            _ => throw new ArgumentOutOfRangeException()
        };
    }


    private Message(string userId, int campaignId, MessageType type, string content)
    {
        UserId = userId;
        Content = content;
        CampaignId = campaignId;
        CreatedAt = DateTime.UtcNow;
        Type = type;
    }

    public static Message CreateTextMessage(string userId, int campaignId, string content)
    {
        return new Message(userId, campaignId, MessageType.Text, content);
    }
    
    public static Message CreateRollMessage(string userId, int campaignId, List<Roll> info)
    {
        return new Message(userId, campaignId, MessageType.Roll, JsonSerializer.Serialize(info));
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

[UnionType("MessageContent")]
public interface IMessageContent
{
}


public class RollMessageContent : IMessageContent
{
    public List<Roll> Rolls { get; set; }
}

public class TextMessageContent : IMessageContent
{
    public string Text { get; set; } = default!;
}

public class Roll
{
    public int Faces { get; set; }
    public int Count { get; set; }
    public List<int>? Result { get; set; } = default;
}