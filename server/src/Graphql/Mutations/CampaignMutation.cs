using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Server.EFModels;
using Server.Graphql.Dtos;
using server.Infraestructure;
using Server.Subscriptions;

namespace Server.Mutations;

[ExtendObjectType("Mutation")]
public class CampaignMutation
{
    
    [Authorize]
    [UseMutationConvention]
    public async Task<CampaignDto> CampaignAdd(
        ClaimsPrincipal user,
        RwfDbContext context,
        [Service] IMapper mapper,
        CampaignInput input)
    {
        
        
        var created = context.Campaigns.CreateProxy();

        mapper.Map(input, created);

        created.Owner = user.GetId();

        await context.AddAsync(created);

        await context.SaveChangesAsync();

        return mapper.Map<CampaignDto>(created);
    }
}