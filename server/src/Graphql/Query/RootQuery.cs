using System.Security.Claims;
using AutoMapper;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Resolvers;
using Server.EFModels;
using server.Infraestructure;
using IConfigurationProvider = AutoMapper.IConfigurationProvider;

namespace Server.Graphql.Query;

public class RootQuery
{
    private readonly IMapper _mapper;
    private readonly IConfigurationProvider _configuration;

    public RootQuery(IMapper mapper, IConfigurationProvider configuration)
    {
        _mapper = mapper;
        _configuration = configuration;
    }

    [UseProjection()]
    [UseFiltering()]
    [Authorize()]
    public IQueryable<Campaign> Campaigns(
        RwfDbContext db,
        ClaimsPrincipal user
    )
    {
        var id = user.GetId();

        return db.Campaigns.Where( c => c.Participants.Any( p => p.UserId == id));
    }
}