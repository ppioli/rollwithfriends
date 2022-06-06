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
        ClaimsPrincipal user,
        RwfDbContext context,
        string name,
        string description)
    {
        var userId = user.GetId();
        var created = new Campaign(
            name: name,
            description: description,
            dungeonMasterId: userId);

        var enrollment = new CampaignEnrollment(userId: userId);

        created.Participants.Add(enrollment);

        await context.AddAsync(created);

        await context.SaveChangesAsync();

        return created;
    }
}