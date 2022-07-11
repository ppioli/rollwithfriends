using System.Security.Claims;
using AutoMapper;
using HotChocolate.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Server.EFModels;
using server.Infraestructure;

namespace Server.Graphql.Mutations;

[ExtendObjectType("Mutation")]
public class CampaignMutation
{
    
    [Authorize]
    public async Task<Campaign> CampaignAdd(
        [Service()] RwfDbContext dbContext,
        ClaimsPrincipal user,
        string name,
        string description,
        string playerName)
    {
        
        var userId = user.GetId();
        
        var created = Campaign.Craete(
            name: name,
            description: description);
        
        var enrollment = CampaignEnrollment.Create(userId, CampaignRoll.DungeonMaster, playerName);
        
        created.Participants.Add(enrollment);
        
        await dbContext.Campaigns.InsertOneAsync(created);

        return created;
    }
}