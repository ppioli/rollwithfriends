using System.Security.Claims;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authorization;
using Server.EFModels;
using server.Infraestructure;

namespace Server.Graphql.Subscriptions;

[ExtendObjectType("Subscription")]
public class MapEntityChangeSubscription
{
    public static string GetTopic(int sceneId)
    {
        return $"{sceneId}_EntityUpdate";
    }

    public ValueTask<ISourceStream<MapEntityChangeMessage>> SubscribeToMapEntity(
        int sceneId,
        [Service] ITopicEventReceiver receiver)
    
    {
        return receiver.SubscribeAsync<string, MapEntityChangeMessage>(GetTopic(sceneId));
    }
    
    [Authorize]
    [Subscribe(With = nameof(SubscribeToMapEntity))]
    public MapEntityChangeMessage MapEntityChanged(
        ClaimsPrincipal user,
        [ID] int sceneId,
        [EventMessage] MapEntityChangeMessage changeEvent)
    {
        return changeEvent;
    }
}

public class MapEntityChangeMessage : ChangeMessage<List<MapEntity>>
{
    public MapEntityChangeMessage(ChangeMessageType type, string userId, List<MapEntity> payload) : base(type, userId, payload)
    {
    }
}