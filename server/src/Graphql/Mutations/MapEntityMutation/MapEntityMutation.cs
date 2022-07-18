using System.Security.Claims;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Data.SqlClient;
using MongoDB.Driver;
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
        var ids = input.Entities
            .Select(s => s.Id)
            .ToArray();

        var fb = Builders<MapEntity>.Filter;

        var updateOperations = db.Scenes.AsQueryable()
            .Where( s => s.Id == input.SceneId)
            .SelectMany( s => s.Entities)
            .Where( s => ids.Contains(s.Id))
            .ToList()
            .Select(
                s =>
                {
                    var vm = input.Entities.First(e => e.Id == s.Id);
                    vm.Apply(s);

                    return s;
                })
            .Select( s =>  new ReplaceOneModel<MapEntity>( fb.Eq( e => e.Id, s.Id), s ))
            .ToArray();
        
        await sender.SendAsync(
            MapEntityChangeSubscription.GetTopic(input.SceneId),
            new MapEntityChangeMessage(ChangeMessageType.Update, user.GetId(), result));
        return result;
    }


    /// <summary>
    /// Delete a group of map entities
    /// </summary>
    [Authorize]
    public async Task<IEnumerable<MapEntityDeletePayload>> MapEntityDelete(
        ClaimsPrincipal user,
        [Service] RwfDbContext db,
        [Service] ITopicEventSender sender,
        [Service()] EnrollmentService enrollmentService,
        [ID] Guid sceneId,
        [ID] ICollection<Guid> deleted)
    {
        if (enrollmentService.GetRollInScene(user, sceneId) != CampaignRoll.DungeonMaster)
        {
            throw new EntityNotFound(sceneId);
        }
        
        // TODO Actually delete ???
        // var deletedList = db.MapEntities.Where(e => deleted.Contains(e.Id) && e.SceneId == sceneId)
        //     .ToList();
        
        // await sender.SendAsync(
        //     MapEntityChangeSubscription.GetTopic(sceneId),
        //     new MapEntityChangeMessage(ChangeMessageType.Delete, user.GetId(), deleted));
        
        return deleted.Select( id => new MapEntityDeletePayload(){ Id = id});

    }

    public class MapEntityDeletePayload
    {
        [ID]
        public Guid Id { get; set; }
    }
}


