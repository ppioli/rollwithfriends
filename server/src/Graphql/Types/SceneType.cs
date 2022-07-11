using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Driver;
using Server.EFModels;
using server.Infraestructure;
using Server.Services;

namespace Server.Graphql.Resolvers;

[Node]
[ExtendObjectType(typeof(Scene))]
public class SceneType
{
    [Authorize]
    [NodeResolver]
    public static Task<Scene> Get(
        [ID] Guid id,
        [Service()] RwfDbContext context,
        [Service()] EnrollmentService enrollmentService,
        ClaimsPrincipal user)
    {
        if (enrollmentService.GetRollInScene(user, id) == null)
        {
            throw new NotAuthorizedException(nameof(Scene));
        }
        return context.Scenes.Find(s => s.Id == id).FirstOrDefaultAsync();
    }
}