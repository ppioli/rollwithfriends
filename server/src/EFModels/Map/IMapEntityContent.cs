using MongoDB.Bson.Serialization.Attributes;
using Server.EFModels.Map;

namespace Server.EFModels;

[UnionType("MapEntityContent")]
[InterfaceType()]
public interface IMapEntityContent
{
    public float Width { get; } 
    public float Height { get; }
    public bool Resizable { get; }
    public void Resize(float width, float height);
}