namespace Server.EFModels.Messages.Roll;

public record RollMessageContent(bool DmRoll, List<Roll> Rolls) : IMessageContent;