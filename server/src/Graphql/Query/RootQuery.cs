using System.Security.Claims;
using AutoMapper;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Data.MongoDb;
using HotChocolate.Resolvers;
using MongoDB.Driver;
using Server.EFModels;
using Server.EFModels.Character5E;
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
    public IExecutable<Campaign> Campaigns(
        [Service()]RwfDbContext db,
        ClaimsPrincipal user
    )
    {
        return db.Campaigns.Find( x => x.DungeonMasterId == user.GetId())
            .AsExecutable();
    }
    
    [UsePaging(IncludeTotalCount = true)]
    [UseFiltering()]
    [Authorize()]
    public IQueryable<NonPlayerCharacter5E> Entries(
        [Service()]RwfDbContext db,
        ClaimsPrincipal user
    )
    {
        // return db.NonPlayerCharacters5E.Where( c => c.Source.OwnerId == user.GetId());
        return null;
    }
    
    [Authorize()]
    [UseFirstOrDefault()]
    public IQueryable<NonPlayerCharacter5E> Entry(
        [Service()]RwfDbContext db,
        ClaimsPrincipal user,
        [ID]int? id
    )
    {
        // return db.NonPlayerCharacters5E.Where( c => c.Source.OwnerId == user.GetId() && c.Id == id);
        return null;
    }
    
    
    [UseFirstOrDefault()]
    [UseProjection()]
    [UseFiltering()]
    [Authorize()]
    public IQueryable<Campaign> Enrollment(
        [Service()]RwfDbContext db,
        ClaimsPrincipal user,
        [ID] int code
    )
    {
        // TODO validate code & hide the rest of the campaign
        // return db.Campaigns.Where( c => c.Id == code);
        return null;
    }
}