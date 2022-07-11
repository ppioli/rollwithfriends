using MongoDB.Bson.Serialization.Attributes;
using Server.EFModels.Map;

namespace Server.EFModels;

[UnionType(nameof(MapEntityContent))]
[BsonKnownTypes(typeof(ImageContent), typeof(Npc5EContent))]
public class MapEntityContent
{
    
}