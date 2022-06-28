using System.Security.Claims;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authorization;
using RollWithFriends.Models.Characters;
using Server.EFModels;
using Server.EFModels.Map;
using Server.Graphql.Subscriptions;
using server.Infraestructure;

using Path = System.IO.Path;

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
        return null;
        // if (!IsGameMaster(input.SceneId, user, db))
        // {
        //     throw new EntityNotFound(input.SceneId);
        // }
        //
        // var result = new List<MapEntity>();
        //
        // // TODO Should check payload size 
        // var ids = input.Entities
        //     .Select(s => s.Id)
        //     .ToArray();
        //
        // var updatedDict = db.MapEntities.Where(e => ids.Contains(e.Id) && e.SceneId == input.SceneId)
        //     .ToDictionary(e => e.Id, e => e);
        //
        // foreach (var e in input.Entities)
        // {
        //     if (!updatedDict.ContainsKey(e.Id))
        //     {
        //         throw new EntityNotFound(e.Id);
        //     }
        //
        //     var updated = updatedDict[e.Id];
        //     updated.X = e.X;
        //     updated.Y = e.Y;
        //
        //     if ( updated.Type == MapEntityType.Image)
        //     {
        //         var content = updated.GetImageContent();
        //         content.Width = e.Width;
        //         content.Height = e.Height;
        //
        //         updated.SetContent(content);    
        //     }
        //     
        //
        //     result.Add(updated);
        // }
        //
        // await db.SaveChangesAsync();
        // await sender.SendAsync(
        //     MapEntityChangeSubscription.GetTopic(input.SceneId),
        //     new MapEntityChangeMessage(ChangeMessageType.Update, user.GetId(), result));
        // return result;
    }


    [Authorize]
    public async Task<ICollection<MapEntity>> MapEntityAdd(
        ClaimsPrincipal user,
        RwfDbContext db,
        [Service] ITopicEventSender sender,
        MapEntitiesAdd input)
    {
        // if (!IsGameMaster(input.SceneId, user, db))
        // {
        //     throw new EntityNotFound(input.SceneId);
        // }
        //
        // var files = input.Entities.Select(
        //     s => new KeyValuePair<MapEntityAdd, AppFile>(
        //         s,
        //         new AppFile(user.GetId(), Path.Join(user.GetId(), $"{input.SceneId}"), "image/*")));
        //
        // var filesDict = new Dictionary<MapEntityAdd, AppFile>(files);
        //
        // await db.AddRangeAsync(filesDict.Values);
        //
        // await db.SaveChangesAsync();
        //
        // var created = input.Entities.Select(
        //         n => MapEntity.CreateImageContent(
        //             n.X,
        //             n.Y,
        //             n.Name,
        //             input.SceneId,
        //             new ImageContent()
        //             {
        //                 Height = n.Height,
        //                 Width = n.Width,
        //                 FileId = filesDict[n].Id
        //             }))
        //     .ToList();
        //
        // await db.AddRangeAsync(created);
        // await db.SaveChangesAsync();
        //
        // await sender.SendAsync(
        //     MapEntityChangeSubscription.GetTopic(input.SceneId),
        //     new MapEntityChangeMessage(ChangeMessageType.Add, user.GetId(), created));
        //
        // return created;

        return null;
    }
    
    [Authorize]
    public async Task<ICollection<MapEntity>> MapEntityNpcAdd(
        ClaimsPrincipal user,
        RwfDbContext db,
        [Service] ITopicEventSender sender,
        MapEntitiesNpcAdd input)
    {
        // if (!IsGameMaster(input.SceneId, user, db))
        // {
        //     throw new EntityNotFound(input.SceneId);
        // }
        //
        // var created = input.Entities.Select(
        //         n => MapEntity.CreateNpcContent(
        //             n.X,
        //             n.Y,
        //             n.Name,
        //             input.SceneId,
        //             new Npc5EContent( 
        //                 n.NpcId, n.Size, n.MaxHp, n.Ac)
        //             ))
        //     .ToList();
        //
        // await db.AddRangeAsync(created);
        // await db.SaveChangesAsync();
        //
        // await sender.SendAsync(
        //     MapEntityChangeSubscription.GetTopic(input.SceneId),
        //     new MapEntityChangeMessage(ChangeMessageType.Add, user.GetId(), created));
        //
        // return created;
        return null;
    }

    [Authorize]
    public async Task<ICollection<MapEntity>> MapEntityDelete(
        ClaimsPrincipal user,
        RwfDbContext db,
        [Service] ITopicEventSender sender,
        [ID] int sceneId,
        [ID] ICollection<int> deleted)
    {
        // if (!IsGameMaster(sceneId, user, db))
        // {
        //     throw new EntityNotFound(sceneId);
        // }
        //
        // // TODO Should check payload size
        // var deletedList = db.MapEntities.Where(e => deleted.Contains(e.Id) && e.SceneId == sceneId)
        //     .ToList();
        //
        // db.RemoveRange(deletedList);
        // await db.SaveChangesAsync();
        // await sender.SendAsync(
        //     MapEntityChangeSubscription.GetTopic(sceneId),
        //     new MapEntityChangeMessage(ChangeMessageType.Delete, user.GetId(), deletedList));
        // return deletedList;
        return null;
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
    public string Name { get; set; } = null!;
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

public class MapEntityUpdate
{
    [ID]
    public int Id { get; set; }

    public int X { get; set; }
    public int Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
}

public class MapEntitiesDelete
{
    [ID]
    public int SceneId { get; set; }

    [ID]
    public ICollection<int> Deleted { get; set; } = default!;
}

public class MapEntitiesNpcAdd
{
    [ID]
    public int SceneId { get; set; }

    public MapEntityNpcAdd[] Entities { get; set; } = default!;
}

public class MapEntityNpcAdd
{
    public string Name { get; set; } = null!;
    public int X { get; set; }
    public int Y { get; set; }

    [ID]
    public int NpcId { get; set; }

    public int Ac { get; set; }
    public int MaxHp { get; set; }
    public Size5E Size { get; set; }
}