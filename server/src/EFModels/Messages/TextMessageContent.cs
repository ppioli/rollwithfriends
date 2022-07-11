namespace Server.EFModels.Messages;

public class TextMessageContent : MessageContent
{
    public string Text { get; set; } = null!;

    protected TextMessageContent()
    {
        Text = "";
    }

    public static TextMessageContent Create(string text)
    {
        return new TextMessageContent()
        {
            Text = text,
        };
    }
}