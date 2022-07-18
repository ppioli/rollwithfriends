namespace Server.EFModels;


public class ImageContent : IMapEntityContent
{
    public AppFile? File { get; set; }
    public float Width { get; set; }
    public float Height { get; set; }
    public bool Resizable => false;
    
    public void Resize(float width, float height)
    {
        Width = width;
        Height = height;
    }

}