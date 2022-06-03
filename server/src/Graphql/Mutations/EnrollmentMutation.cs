using System.Security.Claims;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.EFModels;
using server.Infraestructure;

namespace Server.Graphql.Mutations;


[ExtendObjectType("Mutation")]
public class EnrollmentMutation
{
    
    [UseMutationConvention]
    public async Task<Campaign> EnrollmentAdd(
        RwfDbContext context,
        ClaimsPrincipal claimsPrincipal,
        [Service] IMapper mapper,
        [ID]int campaignId)
    {
        
        var campaign = await context.Campaigns.FindAsync(campaignId);
        
        var created = context.CampaignEnrollments.CreateProxy();

        await context.SaveChangesAsync();

        return mapper.Map<Campaign>(created);
    }
}