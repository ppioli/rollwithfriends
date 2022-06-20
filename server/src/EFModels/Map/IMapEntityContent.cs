namespace Server.EFModels;

[UnionType("MapEntityContent")]
public interface IMapEntityContent
{
    public int Width { get; }
    public int Height { get; }
}