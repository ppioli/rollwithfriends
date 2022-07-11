using RollWithFriends.Models.Characters;
using Server.EFModels.Entries;

namespace Server.Graphql.Types;

[Node]
[ExtendObjectType(typeof(Npc5E))]
public class Npc5EType
{
    [NodeResolver]
    public static async Task<Npc5E> Get([ID] Guid id)
    {
        return null;
    }
}