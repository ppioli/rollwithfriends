using System.Security.Claims;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authorization;
using Server.EFModels;
using Server.EFModels.Map;
using Server.Graphql.Subscriptions;
using server.Infraestructure;
using Server.Services;
using Path = System.IO.Path;

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
        RwfDbContext db,
        [Service] ITopicEventSender sender,
        [Service] EnrollmentService enrollmentService,
        MapEntitiesImageAdd input)
    {
        // if (enrollmentService.GetRollInScene(user, input.SceneId) != CampaignRoll.DungeonMaster)
        // {
        //     throw new NotAuthorizedException();
        // }
        //
        // // create a dictionary mapping each image with the new file created for each one
        // var files = input.Entities
        //     .ToDictionary(
        //         s => s,
        //         v => new AppFile(user.GetId(), Path.Join(user.GetId(), $"{input.SceneId}"), "image/*"));
        //
        //
        // // save the files to create the ids
        // await db.AddRangeAsync(files.Values);
        //
        // await db.SaveChangesAsync();
        //
        // var created = input.Entities.Select(
        //         n => MapEntity.CreateImageContent(
        //             n.X,
        //             n.Y,
        //             n.Name,
        //             input.SceneId,
        //             new ImageContent()
        //             {
        //                 Height = n.Height,
        //                 Width = n.Width,
        //                 FileId = files[n].Id
        //             }))
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