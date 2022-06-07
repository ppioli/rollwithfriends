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
    public async Task<ICollection<MapEntity>> MapEntityUpdate(
        ClaimsPrincipal user,
        RwfDbContext db,
        IEnumerable<MapEntityUpdateInput> input
    )
    {
        var result = new List<MapEntity>();
        foreach (var e in input)
        {
            var updated = await db.FindAsync<MapEntity>(e.Id) ?? throw new EntityNotFound(e.Id);

            if (!IsGameMaster(updated.SceneId, user, db))
            {
                throw new EntityNotFound(e.Id);
            }

            updated.X = e.X;
            updated.Y = e.Y;
            updated.Width = e.Width;
            updated.Height = e.Height;
            
            result.Add(updated);
        }
        
        // await _sender.SendAsync(nameof(MapEntityChangeEvent), MapEntityChangeEvent.Updated(updated));
        await db.SaveChangesAsync();
        return result;
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

        var created = new MapEntity(x, y, width, height, sceneId);

        db.Add(created);

        await db.SaveChangesAsync();

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

public class MapEntityUpdateInput : MapEntityAddInput
{
    [ID] 
    public int Id { get; set; }
    
}

public class MapEntityAddInput
{
    public int X { get; set; }
    public int Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
}