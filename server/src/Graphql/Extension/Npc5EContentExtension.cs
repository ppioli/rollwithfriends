using Server.EFModels.Character5E;
using Server.EFModels.Map;
using server.Infraestructure;

namespace Server.Graphql.Extension;

[ExtendObjectType(typeof(Npc5EContent))]
public class Npc5EContentExtension
{
    public NonPlayerCharacter5E GetNpc( [Parent] Npc5EContent content, RwfDbContext db )
    {
        // TODO Add data loader
        // return db.NonPlayerCharacters5E.First(e => e.Id == content.NpcId);
        return null;
    }
}