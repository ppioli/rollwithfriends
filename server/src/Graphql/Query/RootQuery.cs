using System.Security.Claims;
using AutoMapper;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Resolvers;
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
    public IQueryable<Campaign> Campaigns(
        RwfDbContext db,
        ClaimsPrincipal user
    )
    {
        // var id = user.GetId();
        //
        // return db.Campaigns.Where( c => c.Participants.Any( p => p.UserId == id));

        return null;
    }
    
    [UsePaging(IncludeTotalCount = true)]
    [UseFiltering()]
    [Authorize()]
    public IQueryable<NonPlayerCharacter5E> Entries(
        RwfDbContext db,
        ClaimsPrincipal user
    )
    {
        // return db.NonPlayerCharacters5E.Where( c => c.Source.OwnerId == user.GetId());
        return null;
    }
    
    [Authorize()]
    [UseFirstOrDefault()]
    public IQueryable<NonPlayerCharacter5E> Entry(
        RwfDbContext db,
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
        RwfDbContext db,
        ClaimsPrincipal user,
        [ID] int code
    )
    {
        // TODO validate code & hide the rest of the campaign
        // return db.Campaigns.Where( c => c.Id == code);
        return null;
    }
}