using System.Security.Claims;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Server.EFModels;
using Server.Graphql.Dtos;
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


    [Authorize]
    [UseFirstOrDefault()]
    [UseProjection()]
    public IQueryable<UserDto> User(RwfDbContext context)
    {
        return context.Users.Where(ol => ol.UserName == "admin")
            .ProjectTo<UserDto>(_configuration);
    }
    
    [UseProjection()]
    [UseFiltering()]
    public IQueryable<CampaignDto> Campaigns(
        ClaimsPrincipal user,
        RwfDbContext context
        )
    {
        //var id = user.GetId(); 
        return context.Campaigns
            .Include( s => s.SelectedScene)
            .ThenInclude( s => s.Entities)
            .ProjectTo<CampaignDto>(_configuration);
    }
    
}