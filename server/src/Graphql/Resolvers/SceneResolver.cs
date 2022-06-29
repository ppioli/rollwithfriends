using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Driver;
using Server.EFModels;
using server.Infraestructure;
using Server.Services;

namespace Server.Graphql.Resolvers;

[ExtendObjectType(typeof(Scene))]
public class SceneResolver
{
    [Authorize]
    public Task<Scene> Get(
        [Service()] RwfDbContext context,
        [Service()] EnrollmentService enrollmentService,
        ClaimsPrincipal user,
        [ID] Guid sceneId)
    {
        if (enrollmentService.GetRollInScene(user, sceneId) == null)
        {
            throw new NotAuthorizedException(nameof(Scene));
        }
        return context.Scenes.Find(s => s.Id == sceneId).FirstOrDefaultAsync();
    }
}