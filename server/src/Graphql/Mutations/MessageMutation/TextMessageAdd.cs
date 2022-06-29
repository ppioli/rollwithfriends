using Newtonsoft.Json;
using Server.EFModels.Messages;

namespace Server.Graphql.Mutations.MessageMutation;


/// <summary>
/// Add many text messages
/// </summary>
public class TextMessagesAdd : MessagesAdd<TextMessageAdd>
{
}

/// <summary>
/// A single text message definition
/// </summary>
public class TextMessageAdd
{
    /// <summary>
    /// Map entity sending the message
    /// </summary>
    [ID] public int? SourceId { get; set; }

    /// <summary>
    /// Message
    /// </summary>
    public string Content { get; set; } = null!;
    
    public void Apply(EFModels.Messages.Message source, int campaignId, string userId)
    {

        var textContent = new TextMessageContent(Content);
        source.UserId = userId;
        source.SourceId = SourceId;
        source.CampaignId = campaignId;
        source.Content = JsonConvert.SerializeObject(textContent);
        source.Type = MessageType.Text;
        source.CreatedAt = DateTime.UtcNow;
    }
}