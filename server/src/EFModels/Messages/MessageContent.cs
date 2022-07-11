using System.Runtime.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using Server.EFModels.Messages.Roll;

namespace Server.EFModels.Messages;

[UnionType("MessageContent")]
[BsonKnownTypes( typeof(RollMessageContent), typeof(TextMessageContent) )]
public abstract class MessageContent
{
}