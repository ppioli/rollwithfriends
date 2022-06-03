using AutoMapper;
using HotChocolate.Subscriptions;
using Server.EFModels;
using Server.Graphql.Dtos;
using server.Infraestructure;
using Server.Models;
using Server.Services;
using Server.Subscriptions;

namespace Server.Mutations;


[ExtendObjectType("Mutation")]
public class MapEntityMutation
{
    // private readonly IMapEntityService _mapEntityService;
    // private readonly ITopicEventSender _sender;
    // private readonly IMapper _mapper;
    

    [UseMutationConvention]
    public async Task<MapEntityDto> MapEntityUpdate([ID] int id, MapEntityInput mapEntity)
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
    public async Task<MapEntityDto> MapEntityAdd(MapEntityInput mapEntity)
    {
        // var added = await _mapEntityService.Add(mapEntity);
        //
        // await _sender.SendAsync(nameof(MapEntityChangeEvent), MapEntityChangeEvent.Added(added));
        //
        // return added;
        throw new NotImplementedException();
    }
    
    [UseMutationConvention]
    public async Task<MapEntityDto> MapEntityDelete([ID] int id)
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
