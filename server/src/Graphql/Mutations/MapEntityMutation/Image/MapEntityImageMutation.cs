using System.Security.Claims;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Driver;
using Server.EFModels;
using Server.EFModels.Map;
using Server.Graphql.Subscriptions;
using server.Infraestructure;
using Server.Services;

namespace Server.Graphql.Mutations.MapEntityMutation.Image;

[ExtendObjectType("Mutation")]
public class MapEntityImageMutation
{
    // TODO Reverse this. The add the images first.
    /// <summary>
    /// Add images to the scene. The images themself must be added after the fact.
    /// </summary>
    [Authorize]
    public async Task<ICollection<MapEntity>> MapEntityImageAdd(
        ClaimsPrincipal user,
        [Service()] RwfDbContext db,
        [Service] ITopicEventSender sender,
        [Service] EnrollmentService enrollmentService,
        [Service()] FileStorageService storageService,
        MapEntitiesImageAdd input)
    {
        if (enrollmentService.GetRollInScene(user, input.SceneId) != CampaignRoll.DungeonMaster)
        {
            throw new NotAuthorizedException(nameof(Scene));
        }

        var created = new List<MapEntity>();

        foreach (var n in input.Entities)
        {
            // TODO handle failed file uploads
            storageService.TryCreateFromUpload(user, n.UploadId, $"{input.SceneId}", "image/*", out var file);
            var entity = MapEntity.Create(
                n.Name,
                n.X,
                n.Y,
                new ImageContent()
                {
                    Height = n.Height,
                    Width = n.Width,
                    File = file,
                });
            
            created.Add(entity);
        }
        
        var filter = Builders<Scene>.Filter.Eq( s => s.Id, input.SceneId);
        var update = Builders<Scene>.Update.PushEach(s => s.Entities, created);
        await db.Scenes.UpdateOneAsync(filter, update);
       
        await sender.SendAsync(
            MapEntityChangeSubscription.GetTopic(input.SceneId),
            new MapEntityChangeMessage(ChangeMessageType.Add, user.GetId(), created));

        return created;
    }
}