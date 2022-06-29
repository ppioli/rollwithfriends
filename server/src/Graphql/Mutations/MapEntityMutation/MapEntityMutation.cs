using System.Security.Claims;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authorization;
using Server.EFModels;
using Server.EFModels.Map;
using Server.Graphql.Subscriptions;
using server.Infraestructure;
using Server.Services;
using Path = System.IO.Path;

namespace Server.Graphql.Mutations.MapEntityMutation;

/// <summary>
/// General map entity mutation ( update position, delete )
/// Creation of entity or other operations that require an specific type are handled for specialized mutations
/// </summary>
[ExtendObjectType("Mutation")]
public class MapEntityMutation
{
    /// <summary>
    /// Update a map entity position and size. If the entity is not resizable, the width and height will be ignore
    /// </summary>
    [Authorize]
    public async Task<ICollection<MapEntity>> MapEntityPositionUpdate(
        ClaimsPrincipal user,
        RwfDbContext db,
        [Service] ITopicEventSender sender,
        [Service()] EnrollmentService service,
        MapEntitiesPositionUpdate input
    )
    {
        if ( service.GetRollInScene( user, input.SceneId) != CampaignRoll.DungeonMaster)
        {
            throw new EntityNotFound(input.SceneId);
        }

        var result = new List<MapEntity>();

        // TODO Should check payload size 
        // var ids = input.Entities
        //     .Select(s => s.Id)
        //     .ToArray();
        //
        // var updatedDict = db.MapEntities.Where(e => ids.Contains(e.Id) && e.SceneId == input.SceneId)
        //     .ToDictionary(e => e.Id, e => e);
        //
        // foreach (var e in input.Entities)
        // {
        //     if (!updatedDict.ContainsKey(e.Id))
        //     {
        //         throw new EntityNotFound(e.Id);
        //     }
        //
        //     var updated = updatedDict[e.Id];
        //     updated.X = e.X;
        //     updated.Y = e.Y;
        //
        //     if ( updated.Type.Resizable())
        //     {
        //         updated.Resize(e.Width, e.Height);
        //     }
        //     
        //
        //     result.Add(updated);
        // }
        //
        // await db.SaveChangesAsync();
        // await sender.SendAsync(
        //     MapEntityChangeSubscription.GetTopic(input.SceneId),
        //     new MapEntityChangeMessage(ChangeMessageType.Update, user.GetId(), result));
        // return result;

        return null;
    }


    /// <summary>
    /// Delete a group of map entities
    /// </summary>
    [Authorize]
    public async Task<ICollection<MapEntity>> MapEntityDelete(
        ClaimsPrincipal user,
        RwfDbContext db,
        [Service] ITopicEventSender sender,
        [Service()] EnrollmentService enrollmentService,
        [ID] int sceneId,
        [ID] ICollection<int> deleted)
    {
        // if (enrollmentService.GetRollInScene(user, sceneId) != CampaignRoll.DungeonMaster)
        // {
        //     throw new EntityNotFound(sceneId);
        // }
        //
        // // TODO Should check payload size
        // var deletedList = db.MapEntities.Where(e => deleted.Contains(e.Id) && e.SceneId == sceneId)
        //     .ToList();
        //
        // db.RemoveRange(deletedList);
        // await db.SaveChangesAsync();
        // await sender.SendAsync(
        //     MapEntityChangeSubscription.GetTopic(sceneId),
        //     new MapEntityChangeMessage(ChangeMessageType.Delete, user.GetId(), deletedList));
        // return deletedList;

        return null;
    }
}


