using System.Security.Claims;
using HotChocolate.Data.MongoDb;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Driver;
using Server.EFModels;
using Server.EFModels.Messages;
using server.Infraestructure;
using Server.Services;

namespace Server.Graphql.Types;

[Node]
[ExtendObjectType(typeof(Campaign))]
public class CampaignType
{
    [Authorize]
    public async Task<Scene?> GetSelectedScene(
        [Parent] Campaign campaign,
        [Service()] RwfDbContext context,
        [Service()] EnrollmentService enrollmentService,
        [ID] Guid? sceneId,
        ClaimsPrincipal user)
    {
        var roll = enrollmentService.GetRollInCampaign(user, campaign.Id);
        // find a suitable scene for the user. The dm can select a scene.
        // Players only can see the selected scene
        var selectedSceneId = roll switch
        {
            CampaignRoll.DungeonMaster => sceneId ?? campaign.SelectedSceneId,
            CampaignRoll.Player => sceneId,
            _ => null,
        };

        if (sceneId != null)
        {
            return await context.Scenes.Find(s => s.Id == selectedSceneId).FirstOrDefaultAsync();
        }

        return null;
    }

    [Authorize]
    [NodeResolver]
    public static Task<Campaign> Get(
        [ID] Guid id,
        [Service()] EnrollmentService enrollmentService,
        ClaimsPrincipal user,
        [Service()] RwfDbContext context)
    {
        if (enrollmentService.GetRollInCampaign(user, id) == null)
        {
            throw new NotAuthorizedException(nameof(Campaign));
        }

        return context.Campaigns.Find(c => c.Id == id).FirstOrDefaultAsync();
    }
    
    [Authorize]
    public IEnumerable<Scene> Scenes(
        [Parent] Campaign campaign,
        [Service()] EnrollmentService enrollmentService,
        ClaimsPrincipal user,
        [Service()] RwfDbContext context)
    {
        if (enrollmentService.GetRollInCampaign(user, campaign.Id) != CampaignRoll.DungeonMaster)
        {
            throw new NotAuthorizedException(nameof(Scene));
        }

        return context
            .Scenes
            .Find(c => c.CampaignId == campaign.Id)
            .ToEnumerable();
    }

    [Authorize]
    public bool IsDungeonMaster(
        [Service()] EnrollmentService service,
        [Parent] Campaign campaign,
        ClaimsPrincipal user)
    {
        return service.GetRollInCampaign(user, campaign.Id) == CampaignRoll.DungeonMaster;
    }

    [Authorize]
    [UsePaging()]
    [UseFiltering()]
    public async Task<MongoDbExecutable<Message>> Messages( [Parent] Campaign campaign, RwfDbContext context, CancellationToken ct)
    {
        return context
            .Messages
            .Find(s => s.CampaignId == campaign.Id)
            .AsExecutable();

    } 

}