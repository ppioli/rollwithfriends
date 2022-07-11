using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Driver;
using Server.EFModels;
using Server.EFModels.Map;
using Server.EFModels.Messages;
using server.Infraestructure;
using Server.Infraestructure;
using Server.Services;

namespace Server.Graphql.Types;

[Node]
[ExtendObjectType(typeof(Message))]
public class MessageType
{
    [Authorize]
    [NodeResolver]
    public static async Task<Message> Get(
        [ID] Guid id,
        [Service()] RwfDbContext context,
        [Service()] EnrollmentService enrollmentService,
        ClaimsPrincipal user)
    {
        var message = await context.Messages.FindOneAsync(m => m.Id == id) ??
                      throw new EntityNotFound(id, nameof(Message));
        
        if (enrollmentService.GetRollInCampaign(user, message.CampaignId) == null)
        {
            throw new NotAuthorizedException(nameof(Scene));
        }

        return message;
    }

}