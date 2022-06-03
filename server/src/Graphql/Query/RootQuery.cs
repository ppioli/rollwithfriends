using System.Security.Claims;
using AutoMapper;
using HotChocolate.Resolvers;
using Microsoft.AspNetCore.Authorization;
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
    
    
    // [UseProjection()]
    // [UseFiltering()]
    // public IQueryable<Campaign> Campaigns(
    //     ClaimsPrincipal user,
    //     RwfDbContext context
    //     )
    // {
    //     //var id = user.GetId(); 
    //     return context.Campaigns;
    // }
    
    // [UseProjection()]
    // [UseFiltering()]
    // public IQueryable<Campaign> Campaigns(
    //     ClaimsPrincipal user,
    //     RwfDbContext context
    // )
    // {
    //     //var id = user.GetId(); 
    //     return context.Campaigns;
    // }

    [UseProjection()]
    [UseFiltering()]
    [Authorize]
    public IQueryable<Campaign> Campaigns(
        RwfDbContext db,
        ClaimsPrincipal user,
        IResolverContext context

    )
    {
        var id = user.GetId();

        return db.Campaigns;
    }
}