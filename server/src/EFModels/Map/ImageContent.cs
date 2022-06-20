namespace Server.EFModels;

public class ImageContent : IMapEntityContent {
    public int FileId { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
}