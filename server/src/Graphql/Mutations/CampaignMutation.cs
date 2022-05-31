using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.EFModels;
using Server.Graphql.Dtos;
using server.Infraestructure;
using Server.Subscriptions;

namespace Server.Mutations;

[ExtendObjectType("Mutation")]
public class CampaignMutation
{
    
    [UseMutationConvention]
    public async Task<CampaignDto> CampaignAdd(
        RwfDbContext context,
        [Service] IMapper mapper,
        CampaignInput input)
    {
        var created = context.Campaigns.CreateProxy();

        mapper.Map(input, created);

        await context.SaveChangesAsync();

        return mapper.Map<CampaignDto>(created);
    }
}