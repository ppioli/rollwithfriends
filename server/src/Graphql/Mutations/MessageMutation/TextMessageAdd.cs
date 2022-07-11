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
    [ID] public Guid? SourceId { get; set; }

    /// <summary>
    /// Message
    /// </summary>
    public string Content { get; set; } = null!;
    
    public Message Create(Guid campaignId, Guid userId, string sourceName)
    {
        return Message.Create(userId, SourceId, campaignId, sourceName, TextMessageContent.Create(Content));
        
    }
}