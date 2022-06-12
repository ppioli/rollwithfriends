using System.Security.Claims;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authorization;

namespace Server.Graphql.Subscriptions;

[ExtendObjectType("Subscription")]
public class FileLoadingSubscription
{
    public static string GetTopic(int fileId)
    {
        return $"{fileId}_FileLoading";
    }

    public ValueTask<ISourceStream<FileLoadingMessage>> FileLoadingSubscriptionHandler(
        int fileId,
        [Service] ITopicEventReceiver receiver)
    
    {
        return receiver.SubscribeAsync<string, FileLoadingMessage>(GetTopic(fileId));
    }
    
    [Authorize]
    [Subscribe(With = nameof(FileLoadingSubscriptionHandler))]
    public FileLoadingMessage FileLoadingSub(
        ClaimsPrincipal user,
        int fileId,
        [EventMessage] FileLoadingMessage changeEvent)
    {
        return changeEvent;
    }
}


public class FileLoadingMessage
{
    public int Progress { get; set; }
}