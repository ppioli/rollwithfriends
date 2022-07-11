using Server.EFModels;
using Server.EFModels.Map;
using server.Infraestructure;
using Server.Infraestructure;

namespace Server.Services;

public class SceneService
{
    private readonly RwfDbContext _context;
    private readonly IHttpContextAccessor _contextAccessor;
    private readonly EnrollmentService _enrollmentService;
    
    public SceneService(RwfDbContext context, IHttpContextAccessor contextAccessor, EnrollmentService enrollmentService)
    {
        _context = context;
        _contextAccessor = contextAccessor;
        _enrollmentService = enrollmentService;
    }

    private void CheckPermission(Guid sceneId)
    {
        var user = _contextAccessor.HttpContext?.User;
        if (user == null || _enrollmentService.GetRollInScene(user, sceneId) == null)
        {
            throw new NotAuthorizedException(nameof(Scene));
        }
    }
    
    public async Task<MapEntity> GetEntityAsync(Guid sceneId, Guid mapEntityId)
    {
        CheckPermission(sceneId);
        
        var scene = await _context.Scenes.FindOneAsync(s => s.Id == sceneId)
            ?? throw new EntityNotFound(sceneId, nameof(Scene));

        return scene.Entities.FirstOrDefault(s => s.Id == mapEntityId) ??
                     throw new EntityNotFound(mapEntityId, nameof(MapEntity));
    }
    
    public MapEntity GetEntity(Guid sceneId, Guid mapEntityId)
    {
        return AsyncHelper.RunSync(() => GetEntityAsync(sceneId, mapEntityId));
    }
}