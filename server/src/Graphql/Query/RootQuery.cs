using AutoMapper;
using AutoMapper.QueryableExtensions;
using Server.EFModels;
using server.Infraestructure;
using Server.Models;
using Server.Services;
using IConfigurationProvider = AutoMapper.IConfigurationProvider;

namespace Server.Query;

public class RootQuery
{
    private readonly IMapper _mapper;
    private readonly IConfigurationProvider _configuration;

    public RootQuery(IMapper mapper, IConfigurationProvider configuration)
    {
        _mapper = mapper;
        _configuration = configuration;
    }


    [UseFirstOrDefault()]
    [UseProjection()]
    public IQueryable<UserDto> User(RwfDbContext context)
    {
        return context.Users.Where(ol => ol.UserName == "admin")
            .ProjectTo<UserDto>(_configuration);
    } 
        
}