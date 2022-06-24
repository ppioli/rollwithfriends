namespace Server.EFModels.Messages;

public record TextMessageContent(string Text) : IMessageContent;