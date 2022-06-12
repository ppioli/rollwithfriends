using System.Security.Claims;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authorization;
using Server.EFModels.Messages;
using server.Infraestructure;
using Server.Services;

namespace Server.Graphql.Subscriptions;

[ExtendObjectType("Subscription")]
public class MessageSubscription
{
    public static string GetTopic(int campaignId)
    {
        return $"{campaignId}_Message";
    }

    [Authorize]
    public ValueTask<ISourceStream<MessageEvent>> MessageSubscriptionHandler(
        ClaimsPrincipal user,
        [Service()] EnrollmentService enrollmentService,
        int campaignId,
        [Service] ITopicEventReceiver receiver)
    
    {
        if (enrollmentService.GetRollInCampaign(user, campaignId) == null)
        {
            throw new NotAuthorizedException();
        }
        return receiver.SubscribeAsync<string, MessageEvent>(GetTopic(campaignId));
    }
        
    [Subscribe(With = nameof(MessageSubscriptionHandler))]
    public MessageEvent MessageSub(
        ClaimsPrincipal user,
        [ID]int campaignId,
        [EventMessage] MessageEvent message)
    {
        return message;
    }
}

public class MessageEvent
{
    public ICollection<Message> Messages { get; set; }
}