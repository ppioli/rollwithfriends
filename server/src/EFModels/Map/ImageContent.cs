namespace Server.EFModels;


public class ImageContent : MapEntityContent, IResizable
{
    public AppFile? File { get; set; }
    public float Width { get; set; }
    public float Height { get; set; }
    public void Resize(int width, int height)
    {
        Width = width;
        Height = height;

    }
}

public interface IResizable
{
    public void Resize(int width, int height);
}