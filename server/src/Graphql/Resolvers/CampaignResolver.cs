using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Driver;
using Server.EFModels;
using server.Infraestructure;
using Server.Services;

namespace Server.Graphql.Resolvers;

[ExtendObjectType(typeof(Campaign))]
public class CampaignResolver
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
    public Task<Campaign> Get(
        [ID] Guid campaignId,
        [Service()] EnrollmentService enrollmentService,
        ClaimsPrincipal user,
        [Service()] RwfDbContext context)
    {
        if (enrollmentService.GetRollInCampaign(user, campaignId) == null)
        {
            throw new NotAuthorizedException(nameof(Campaign));
        }

        return context.Campaigns.Find(c => c.Id == campaignId).FirstOrDefaultAsync();
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
        [Parent] Campaign campaign,
        ClaimsPrincipal user)
    {
        return user.GetId() == campaign.DungeonMasterId;
    }
    
    


    // [UsePaging(IncludeTotalCount = true)]
    // public IQueryable<Message> GetMessages(RwfDbContext context) => context.Messages
    //     .Where(m => m.CampaignId == Id)
    //     .OrderBy(s => s.CreatedAt);

    // public virtual ICollection<Scene> Scenes { get; set; } = new List<Scene>();
    //
    // public virtual Scene? SelectedScene { get; set; }
    //
    // [GraphQLIgnore]
    // public virtual ICollection<Message> Messages { get; set; } = default!;
}