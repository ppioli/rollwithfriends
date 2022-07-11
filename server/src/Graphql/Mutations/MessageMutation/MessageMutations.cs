using System.Security.Claims;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Server.EFModels;
using Server.EFModels.Map;
using Server.EFModels.Messages;
using Server.Graphql.Subscriptions;
using server.Infraestructure;
using Server.Services;

namespace Server.Graphql.Mutations.MessageMutation;

[ExtendObjectType("Mutation")]
public class MessageMutation
{
    [Authorize]
    public async Task<ICollection<Message>> TextMessageAdd(
        ClaimsPrincipal user,
        [Service] RwfDbContext db,
        [Service()] ITopicEventSender sender,
        [Service()] SceneService sceneService,
        [Service()] EnrollmentService enrollmentService,
        TextMessagesAdd input
    )
    {
        if (enrollmentService.GetRollInCampaign(user, input.CampaignId) == null)
        {
            throw new NotAuthorizedException(nameof(Campaign));
        }
        
        ICollection<Message> created = input.Messages
            .Select(
                data =>
                {
                    MapEntity? source = null;
                    if (input.SceneId != null && data.SourceId != null)
                    {
                        source = sceneService.GetEntity(input.SceneId.Value, data.SourceId.Value);
                    }

                    var sourceName = source?.Name ??
                                     enrollmentService.GetPlayerName(user, input.CampaignId) ??
                                     throw new ApiException("Could not determine the source name");
                    
                    return data.Create(input.CampaignId, user.GetId(), sourceName);
                })
            .ToList();
        
        await db.Messages.InsertManyAsync(created);
        
        await sender.SendAsync(
            MessageSubscription.GetTopic(input.CampaignId),
            new MessageEvent() { Messages = created });
        
        return created;
    }

    [Authorize]
    public async Task<ICollection<Message>> RollMessageAdd(
        ClaimsPrincipal user,
        RwfDbContext context,
        [Service()] ITopicEventSender sender,
        [Service()] EnrollmentService enrollmentService,
        [Service()] SceneService sceneService,
        RollMessagesAdd input
    )
    {
        if (enrollmentService.GetRollInCampaign(user, input.CampaignId) == null)
        {
            throw new NotAuthorizedException( nameof(Campaign));
        }

        ICollection<Message> created = input.Messages
            .Select(
                message =>
                {
                    MapEntity? source = null;
                    if (input.SceneId != null && message.SourceId != null)
                    {
                        source = sceneService.GetEntity(input.SceneId.Value, message.SourceId.Value);
                    }

                    var sourceName = source?.Name ??
                                     enrollmentService.GetPlayerName(user, input.CampaignId) ??
                                     throw new ApiException("Could not determine the source name");

                    return message.Create(input.CampaignId, user.GetId(), sourceName);
                })
            .ToList();
        
        await context.Messages.InsertManyAsync(created);
        
        await sender.SendAsync(
            MessageSubscription.GetTopic(input.CampaignId),
            new MessageEvent() { Messages = created });

        return created;
    }
}
