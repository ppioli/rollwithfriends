using System.Security.Claims;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authorization;
using Server.EFModels;
using Server.EFModels.Map;
using Server.Graphql.Subscriptions;
using server.Infraestructure;
using Server.Services;

namespace Server.Graphql.Mutations.MapEntityMutation.Npc5E;

[ExtendObjectType("Mutation")]
public class MapEntityNpc5EMutation
{
    /// <summary>
    /// Add five edition NPCs to the scene
    /// </summary>
    [Authorize]
    public async Task<ICollection<MapEntity>> MapEntityNpc5EAdd(
        ClaimsPrincipal user,
        RwfDbContext db,
        [Service] ITopicEventSender sender,
        [Service()] EnrollmentService enrollmentService,
        MapEntitiesNpc5EAdd input)
    {
        // if ( enrollmentService.GetRollInScene( user, input.SceneId) != CampaignRoll.DungeonMaster )
        // {
        //     throw new NotAuthorizedException();
        // }
        //
        // var created = input.Entities.Select(
        //         n => MapEntity.CreateNpcContent(
        //             n.X,
        //             n.Y,
        //             n.Name,
        //             input.SceneId,
        //             new Npc5EContent( 
        //                 n.NpcId, n.Size, n.MaxHp, n.Ac)
        //             ))
        //     .ToList();
        //
        // await db.AddRangeAsync(created);
        // await db.SaveChangesAsync();
        //
        // await sender.SendAsync(
        //     MapEntityChangeSubscription.GetTopic(input.SceneId),
        //     new MapEntityChangeMessage(ChangeMessageType.Add, user.GetId(), created));
        //
        // return created;

        return null;
    }
}