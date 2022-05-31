namespace Server.EFModels;

using AutoMapper;
using Services;


/// <summary>
/// Represents something on the table
/// </summary>
public class MapEntity
{
    public int Id { get; set; }
    public int X { get; set; }
    public int Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }

    public virtual Scene Scene { get; set; } = null!;
    public int SceneId { get; set; }
}
