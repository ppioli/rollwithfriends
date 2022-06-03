using AutoMapper;
using Server.EFModels;
using Server.Services;

namespace Server.Graphql.Dtos;

public class MapEntityBase
{
    public int X { get; set; }
    public int Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
}

[Node]
[GraphQLName("MapEntity")]
public class MapEntityDto : MapEntityBase
{
    [ID]
    public int Id { get; set; }
    
    public static MapEntityDto Get(int id,
        [Service] IMapEntityService service)
    {
        throw new NotImplementedException();
    }
}

public class MapEntityInput : MapEntityBase
{
}

public class MapEntityPayload
{
    public MapEntityDto MapEntity { get; set; } = default!;

    private MapEntityPayload() { }

    public static MapEntityPayload Create(MapEntityDto mapEntity)
    {
        return new MapEntityPayload()
        {
            MapEntity = mapEntity
        };
    }
}

public class MapEntityProfile : Profile
{
    public MapEntityProfile()
    {
        CreateMap<MapEntity, MapEntityBase>(MemberList.Destination);
        CreateMap<MapEntityBase, MapEntity>(MemberList.Source);
        CreateMap<MapEntityInput, MapEntity>(MemberList.Source)
            .IncludeBase<MapEntityBase, MapEntity>();
    }
}