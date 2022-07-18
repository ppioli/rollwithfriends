using System.Drawing;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Server.EFModels.Map;
using server.Infraestructure;
using Server.Services;

namespace Server.Graphql.Types;

[Node]
[ExtendObjectType(typeof(MapEntity))]
public class MapEntityType
{
    [Authorize]
    [NodeResolver]
    public static async Task<MapEntity> Get(
        [ID] Guid id,
        [Service()] RwfDbContext context,
        [Service()] EnrollmentService enrollmentService,
        ClaimsPrincipal user)
    {
        // var message = await context.MapEntitys.FindOneAsync(m => m.Id == messageId) ??
        //               throw new EntityNotFound(messageId, nameof(MapEntity));
        //
        // if (enrollmentService.GetRollInCampaign(user, message.CampaignId) == null)
        // {
        //     throw new NotAuthorizedException(nameof(Scene));
        // }
        //
        // return message;
        return null;
    }

}