using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Server.EFModels;
using server.Infraestructure;

namespace Server.Graphql.Mutations;


[ExtendObjectType("Mutation")]
public class EnrollmentMutation
{
    [Authorize]
    public async Task<Campaign> EnrollmentAdd(
        RwfDbContext db,
        ClaimsPrincipal user,
        [ID] int code )
    {
        //TODO validate code. For now, the code is just the campaign id
        var campaign = db.Campaigns
            .Include( c => c.Participants)
            .FirstOrDefault(c => c.Id == code) ?? throw new EntityNotFound(code);
        
        var userId = user.GetId();

        if (campaign.Participants.Any(p => p.UserId == userId))
        {
            return campaign;
        }
        
        campaign.Participants.Add( new CampaignEnrollment(userId));

        await db.SaveChangesAsync();

        return campaign;
    }
}