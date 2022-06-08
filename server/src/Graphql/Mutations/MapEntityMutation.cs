using System.Security.Claims;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authorization;
using Server.EFModels;
using Server.Graphql.Subscriptions;
using server.Infraestructure;

namespace Server.Graphql.Mutations;

[ExtendObjectType("Mutation")]
public class MapEntityMutation
{
    [Authorize]
    public async Task<ICollection<MapEntity>> MapEntityUpdate(
        ClaimsPrincipal user,
        RwfDbContext db,
        [Service] ITopicEventSender sender,
        MapEntitiesUpdate input
    )
    {
        
        if (!IsGameMaster(input.SceneId, user, db))
        {
            throw new EntityNotFound(input.SceneId);
        }
        
        var result = new List<MapEntity>();
        
        // TODO Should check payload size 
        var ids = input.Entities
            .Select(s => s.Id)
            .ToArray();
        
        var updatedDict = db.MapEntities.Where(e => ids.Contains(e.Id) && e.SceneId == input.SceneId)
            .ToDictionary( e => e.Id, e => e);

        foreach (var e in input.Entities)
        {
            if (!updatedDict.ContainsKey(e.Id))
            {
                throw new EntityNotFound(e.Id);
            }
            var updated = updatedDict[e.Id]; 
            updated.X = e.X;
            updated.Y = e.Y;
            updated.Width = e.Width;
            updated.Height = e.Height;
            
            result.Add(updated);
        }
        await db.SaveChangesAsync();
        await sender.SendAsync(MapEntityChangeSubscription.GetTopic(input.SceneId), new MapEntityChangeMessage(
            ChangeMessageType.Update, user.GetId(), result));
        return result;
    }


    [Authorize]
    public async Task<ICollection<MapEntity>> MapEntityAdd(
        ClaimsPrincipal user,
        RwfDbContext db,
        [Service] ITopicEventSender sender,
        MapEntitiesAdd input)
    {
        if (!IsGameMaster(input.SceneId, user, db))
        {
            throw new EntityNotFound(input.SceneId);
        }

        var created = input.Entities.Select(n => new MapEntity(n.X, n.Y, n.Width, n.Height, input.SceneId)).ToList();
        
        await db.AddRangeAsync(created);
        await db.SaveChangesAsync();
        
        await sender.SendAsync(MapEntityChangeSubscription.GetTopic(input.SceneId), new MapEntityChangeMessage(
            ChangeMessageType.Add, user.GetId(), created));
        return created;
    }
    
    [Authorize]
    public async Task<ICollection<MapEntity>> MapEntityDelete(
        ClaimsPrincipal user,
        RwfDbContext db,
        [Service] ITopicEventSender sender,
        MapEntityDelete input)
    {
        if (!IsGameMaster(input.SceneId, user, db))
        {
            throw new EntityNotFound(input.SceneId);
        }
        
        var result = new List<MapEntity>();
        
        // TODO Should check payload size
        var deletedList = db.MapEntities.Where(e => input.Deleted.Contains(e.Id) && e.SceneId == input.SceneId)
            .ToList();
        
        db.RemoveRange(deletedList);
        await db.SaveChangesAsync();
        await sender.SendAsync(MapEntityChangeSubscription.GetTopic(input.SceneId), new MapEntityChangeMessage(
            ChangeMessageType.Delete, user.GetId(), result));
        return result;
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


public class MapEntitiesAdd
{
    [ID] 
    public int SceneId { get; set; }

    public MapEntityAdd[] Entities { get; set; } = default!;

}

public class MapEntityAdd
{
    public int X { get; set; }
    public int Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
}

public class MapEntitiesUpdate 
{
    [ID] 
    public int SceneId { get; set; }
    
    public MapEntityUpdate[] Entities { get; set; } = default!;
}

public class MapEntityUpdate : MapEntityAdd
{
    [ID]
    public int Id { get; set; }
}

public class MapEntityDelete
{
    [ID] 
    public int SceneId { get; set; }
    [ID]
    public ICollection<int> Deleted { get; set; }
}