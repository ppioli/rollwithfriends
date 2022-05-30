using AutoMapper;
using HotChocolate.Subscriptions;
using Server.Models;
using Server.Services;
using Server.Subscriptions;

namespace Server.Mutations;

public class MapEntityMutation
{
    private readonly IMapEntityService _mapEntityService;
    private readonly ITopicEventSender _sender;
    private readonly IMapper _mapper;
    
    public MapEntityMutation(IMapEntityService mapEntityService, IMapper mapper, ITopicEventSender sender)
    {
        _mapEntityService = mapEntityService;
        _mapper = mapper;
        _sender = sender;
    }

    [UseMutationConvention]
    public async Task<MapEntity> MapEntityUpdate([ID] int id, MapEntityInput mapEntity)
    {
        var updated = await _mapEntityService.Update(id, mapEntity);

        await Task.Delay(2000);

        await _sender.SendAsync(nameof(MapEntityChangeEvent), MapEntityChangeEvent.Updated(updated));
        
        return updated;
    }
    
    
    [UseMutationConvention]
    public async Task<MapEntity> MapEntityAdd(MapEntityInput mapEntity)
    {
        var added = await _mapEntityService.Add(mapEntity);

        await _sender.SendAsync(nameof(MapEntityChangeEvent), MapEntityChangeEvent.Added(added));

        return added;
    }

    [UseMutationConvention]
    public async Task<MapEntity> MapEntityDelete([ID] int id)
    {
        await _sender.SendAsync(nameof(MapEntityChangeEvent), MapEntityChangeEvent.Deleted(id));

        var t = _mapEntityService.GetById(id)!;
        
        await _mapEntityService.Delete(id);

        return t;
    }
}
