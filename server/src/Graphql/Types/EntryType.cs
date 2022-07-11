using RollWithFriends.Models;
using Server.EFModels.Entries;

namespace Server.Graphql.Types;

[Node]
[ExtendObjectType(typeof(IEntry))]
public class EntryType
{

    [NodeResolver]
    public static async Task<IEntry> Get([ID] Guid id)
    {
        return null;
    } 
}