
using Server.EFModels;

namespace Server.Graphql.Mutations;


[ExtendObjectType("Mutation")]
public class MapEntityMutation
{
    // private readonly IMapEntityService _mapEntityService;
    // private readonly ITopicEventSender _sender;
    // private readonly IMapper _mapper;
    

    [UseMutationConvention]
    public async Task<MapEntity> MapEntityUpdate([ID] int id,
        int x,
        int y,
        int width,
        int height
        )
    {
        // var updated = await _mapEntityService.Update(id, mapEntity);
    
        // await Task.Delay(2000);
        //
        // await _sender.SendAsync(nameof(MapEntityChangeEvent), MapEntityChangeEvent.Updated(updated));
        //
        // return updated;
        throw new NotImplementedException();
    }
    
    
    [UseMutationConvention]
    public async Task<MapEntity> MapEntityAdd(
        int x,
        int y,
        int width,
        int height)
    {
        // var added = await _mapEntityService.Add(mapEntity);
        //
        // await _sender.SendAsync(nameof(MapEntityChangeEvent), MapEntityChangeEvent.Added(added));
        //
        // return added;
        throw new NotImplementedException();
    }
    
    [UseMutationConvention]
    public async Task<MapEntity> MapEntityDelete([ID] int id)
    {
        // await _sender.SendAsync(nameof(MapEntityChangeEvent), MapEntityChangeEvent.Deleted(id));
        //
        // var t = _mapEntityService.GetById(id)!;
        //
        // await _mapEntityService.Delete(id);
        //
        // return t;
        throw new NotImplementedException();
    }
}
