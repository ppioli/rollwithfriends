using AutoMapper;
using Server.Services;

namespace Server.Models;

/// <summary>
/// Represents something on the table
/// </summary>
[Node]
public class MapEntity
{
    [ID]
    public int Id { get; set; }
    public int X { get; set; }
    public int Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    
    public static MapEntity Get(int id,
        [Service] IMapEntityService service)
    {
        // TODO
        return service.GetById(id)!;
    }
}

public class MapEntityBase
{
    public int X { get; set; }
    public int Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
}

public class MapEntityInput : MapEntityBase
{
}

public class MapEntityPayload
{
    public MapEntity MapEntity { get; set; } = default!;

    private MapEntityPayload() { }

    public static MapEntityPayload Create(MapEntity mapEntity)
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