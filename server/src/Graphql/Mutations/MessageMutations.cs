using System.Security.Claims;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authorization;
using Server.EFModels;
using Server.EFModels.Messages;
using Server.Graphql.Subscriptions;
using server.Infraestructure;
using Server.Services;
using Roll = Server.EFModels.Messages.Roll;

namespace Server.Graphql.Mutations;

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
        if (enrollmentService.GetRollInCampaign(user, input.CampaignId) == null)
        {
            throw new NotAuthorizedException();
        }
    
        ICollection<Message> created = input.Messages
            .Select(message => Message.CreateTextMessage(user.GetId(), input.CampaignId, message.Content)).ToList();
        
        await db.AddRangeAsync(created);
    
        await db.SaveChangesAsync();
    
        await sender.SendAsync(MessageSubscription.GetTopic(input.CampaignId), new MessageEvent() { Messages = created });
    
        return created;
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
        if (enrollmentService.GetRollInCampaign(user, input.CampaignId) == null)
        {
            throw new NotAuthorizedException();
        }
    
        
        Random random = new Random();  
        ICollection<Message> created = input.Messages
            .Select(
                message =>
                {
                    var rolls = message.Content.Select(
                        roll =>
                        {
                            return new Roll()
                            {
                                Count = roll.Count,
                                Faces = roll.Faces,
                                Result = Enumerable.Range(0, roll.Count)
                                    .Select(s => random.Next(1, roll.Faces + 1))
                                    .ToList()
                            };
                        }).ToList();
                    
                    return Message.CreateRollMessage(user.GetId(), input.CampaignId, rolls);
                }).ToList();
        
        await db.AddRangeAsync(created);
    
        await db.SaveChangesAsync();
    
        await sender.SendAsync(MessageSubscription.GetTopic(input.CampaignId), new MessageEvent() { Messages = created });
    
        return created;
    }
}

public class TextMessageAdd
{
    public string Content { get; set; } = null!;
}

public class RollMessageAdd
{
    public List<RollInfo> Content { get; set; } = null!;
}

public class MessagesAdd<T>
{
    [ID]
    public int CampaignId { get; set; }

    public ICollection<T> Messages { get; set; } = null!;
}

public class RollInfo
{
    public int Faces { get; set; }
    public int Count { get; set; }
}

public class TextMessagesAdd : MessagesAdd<TextMessageAdd> {}
public class RollMessagesAdd : MessagesAdd<RollMessageAdd> {}


