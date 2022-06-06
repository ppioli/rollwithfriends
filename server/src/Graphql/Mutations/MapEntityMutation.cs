
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Server.EFModels;
using server.Infraestructure;

namespace Server.Graphql.Mutations;


[ExtendObjectType("Mutation")]
public class MapEntityMutation
{
    
    public MapEntityMutation()
    {
        
    }

    [UseMutationConvention]
    [Authorize]
    public async Task<MapEntity> MapEntityUpdate(
        ClaimsPrincipal user,
        RwfDbContext db,
        [ID] int id,
        int x,
        int y,
        int width,
        int height
        )
    {
        var updated = await db.FindAsync<MapEntity>(id) ?? throw new EntityNotFound(id);

        if (!IsGameMaster(updated.SceneId, user, db))
        {
            throw new EntityNotFound(id);
        }
        
        updated.X = x;
        updated.Y = y;
        updated.Width = width;
        updated.Height = height;
        // await _sender.SendAsync(nameof(MapEntityChangeEvent), MapEntityChangeEvent.Updated(updated));
        await db.SaveChangesAsync();
        return updated;
    }
    
    
    [UseMutationConvention]
    [Authorize]
    public async Task<MapEntity> MapEntityAdd(
        ClaimsPrincipal user,
        RwfDbContext db,
        [ID] int sceneId,
        int x,
        int y,
        int width,
        int height)
    {
        if (!IsGameMaster(sceneId, user, db))
        {
            throw new EntityNotFound(sceneId);
        }
        var created = new MapEntity(x,y,width,height, sceneId);

        db.Add(created);
        
        await  db.SaveChangesAsync();

        return created;
    }
    
    [UseMutationConvention]
    [Authorize]
    public async Task<MapEntity> MapEntityDelete(
        ClaimsPrincipal user,
        RwfDbContext db,
        [ID] int id)
    {
        
        // await _sender.SendAsync(nameof(MapEntityChangeEvent), MapEntityChangeEvent.Deleted(id));
        
        var removed = await db.FindAsync<MapEntity>(id) ?? throw new EntityNotFound(id);

        if (!IsGameMaster(removed.SceneId, user, db))
        {
            throw new EntityNotFound(id);
        }
        
        db.Remove(id);

        await db.SaveChangesAsync();

        return removed;
    }

    private bool IsGameMaster(int sceneId, ClaimsPrincipal user, RwfDbContext context)
    {
        var userId = user?.GetId();
        var dmId = context.Scenes
            .Where(s => s.Id == sceneId)
            .Select(s => s.Campaign.DungeonMasterId)
            .First();

        return dmId == userId;

    }
}
