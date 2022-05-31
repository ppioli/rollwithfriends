using System.Security.Claims;
using AutoMapper;
using HotChocolate.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Server.Graphql.Dtos;
using server.Infraestructure;

namespace Server.Mutations;


[ExtendObjectType("Mutation")]
public class EnrollmentMutation
{
    
    [UseMutationConvention]
    public async Task<CampaignDto> EnrollmentAdd(
        RwfDbContext context,
        ClaimsPrincipal claimsPrincipal,
        [Service] IMapper mapper,
        [ID]int campaignId)
    {
        
        var campaign = await context.Campaigns.FindAsync(campaignId);
        
        var created = context.CampaignEnrollments.CreateProxy();

        await context.SaveChangesAsync();

        return mapper.Map<CampaignDto>(created);
    }
}