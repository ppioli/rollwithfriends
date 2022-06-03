using System.Security.Claims;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.EFModels;
using server.Infraestructure;

namespace Server.Graphql.Mutations;

[ExtendObjectType("Mutation")]
public class CampaignMutation
{
    
    public async Task<Campaign> CampaignAdd(
        ClaimsPrincipal user,
        RwfDbContext context,
        [Service] IMapper mapper,
        string name,
        string description)
    {


        var created = new Campaign(
            name: name,
            description: description);

        var enrollment = new CampaignEnrollment(userId: user.GetId(), rol: Rol.DungeonMaster);

        created.Participants.Add(enrollment);

        await context.AddAsync(created);

        await context.SaveChangesAsync();

        return created;
    }
}