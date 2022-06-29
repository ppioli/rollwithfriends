using System.Security.Claims;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
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
        RwfDbContext db,
        [Service()] ITopicEventSender sender,
        [Service()] EnrollmentService enrollmentService,
        TextMessagesAdd input
    )
    {
        // if (enrollmentService.GetRollInCampaign(user, input.CampaignId) == null)
        // {
        //     throw new NotAuthorizedException();
        // }
        //
        // ICollection<Message> created = input.Messages
        //     .Select(
        //         message =>
        //         {
        //             var proxy = db.CreateProxy<Message>();
        //             
        //             message.Apply(proxy, input.CampaignId, user.GetId());
        //
        //             return proxy;
        //         })
        //     .ToList();
        //
        // await db.AddRangeAsync(created);
        //
        // await db.SaveChangesAsync();
        //
        // await sender.SendAsync(
        //     MessageSubscription.GetTopic(input.CampaignId),
        //     new MessageEvent() { Messages = created });
        return null;
    }

    [Authorize]
    public async Task<ICollection<Message>> RollMessageAdd(
        ClaimsPrincipal user,
        RwfDbContext db,
        [Service()] ITopicEventSender sender,
        [Service()] EnrollmentService enrollmentService,
        RollMessagesAdd input
    )
    {
        // if (enrollmentService.GetRollInCampaign(user, input.CampaignId) == null)
        // {
        //     throw new NotAuthorizedException();
        // }
        //
        //
        // ICollection<Message> created = input.Messages
        //     .Select(
        //         message =>
        //         {
        //             var proxy = db.CreateProxy<Message>();
        //             
        //             message.Apply(proxy, input.CampaignId, user.GetId());
        //
        //             return proxy;
        //         })
        //     .ToList();
        //
        // await db.AddRangeAsync(created);
        //
        // await db.SaveChangesAsync();
        //
        // await sender.SendAsync(
        //     MessageSubscription.GetTopic(input.CampaignId),
        //     new MessageEvent() { Messages = created });
        //
        // return created;

        return null;
    }
}
