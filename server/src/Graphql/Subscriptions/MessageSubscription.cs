using System.Security.Claims;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authorization;
using Server.EFModels;
using Server.EFModels.Messages;
using server.Infraestructure;
using Server.Services;

namespace Server.Graphql.Subscriptions;

[ExtendObjectType("Subscription")]
public class MessageSubscription
{
    public static string GetTopic(Guid campaignId)
    {
        return $"{campaignId}_Message";
    }

    [Authorize]
    public ValueTask<ISourceStream<MessageEvent>> MessageSubscriptionHandler(
        ClaimsPrincipal user,
        [Service()] EnrollmentService enrollmentService,
        Guid campaignId,
        [Service] ITopicEventReceiver receiver)
    
    {
        if (enrollmentService.GetRollInCampaign(user, campaignId) == null)
        {
            throw new NotAuthorizedException(nameof(Campaign));
        }
        // TODO Should hide dm rolls
        return receiver.SubscribeAsync<string, MessageEvent>(GetTopic(campaignId));
    }
        
    [Subscribe(With = nameof(MessageSubscriptionHandler))]
    public MessageEvent MessageSub(
        ClaimsPrincipal user,
        [ID]Guid campaignId,
        [EventMessage] MessageEvent message)
    {
        return message;
    }
}

public class MessageEvent
{
    public ICollection<Message> Messages { get; set; }
}