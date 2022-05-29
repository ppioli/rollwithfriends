using AutoMapper;
using Server.Models;

namespace Server.Services;

public interface IMapEntityService
{
    public ICollection<MapEntity> GetAll();
    public MapEntity? GetById(int id);
    public Task<MapEntity> Update(int id, MapEntityInput input);
    public Task<MapEntity> Add(MapEntityInput input);
    public Task Delete(int id);
}

public class MapEntityService : IMapEntityService
{
    public static readonly ICollection<MapEntity> Tokens = new List<MapEntity>()
    {
        new()
        {
            Id = 1,
            X = 500,
            Y = 500,
            Width = 30,
            Height = 30,
        },
        new()
        {
            Id = 2,
            X = 250,
            Y = 250,
            Width = 50,
            Height = 50,
        },
        new()
        {
            Id = 3,
            X = 100,
            Y = 100,
            Width = 70,
            Height = 70,
        },
    };

    private readonly IMapper _mapper;


    public MapEntityService(IMapper mapper)
    {
        _mapper = mapper;
    }

    public ICollection<MapEntity> GetAll()
    {
        return Tokens;
    }

    public MapEntity? GetById(int id)
    {
        return Tokens.FirstOrDefault(t => t.Id == id);
    }

    public Task<MapEntity> Update(int id, MapEntityInput input)
    {
        var token = GetById(id)!;

        _mapper.Map(input, token);

        return Task.FromResult(token);
    }

    public Task<MapEntity> Add(MapEntityInput input)
    {
        var newToken = _mapper.Map(input, new MapEntity());
        newToken.Id = Tokens.Count + 1;
        Tokens.Add(newToken);
        return Task.FromResult(newToken);
    }

    public async Task Delete(int id)
    {
        Tokens.Remove(GetById(id)!);
    }
}