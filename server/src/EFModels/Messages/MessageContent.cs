using MongoDB.Bson.Serialization.Attributes;
using Server.EFModels.Messages.Roll;

namespace Server.EFModels.Messages;

[UnionType("MessageContent")]
[BsonDiscriminator(RootClass = true)]
[BsonKnownTypes( typeof(RollMessageContent), typeof(TextMessageContent) )]
public class MessageContent
{
}