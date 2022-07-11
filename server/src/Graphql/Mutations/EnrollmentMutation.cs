using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using MongoDB.Bson;
using MongoDB.Driver;
using Server.EFModels;
using server.Infraestructure;

namespace Server.Graphql.Mutations;


[ExtendObjectType("Mutation")]
public class EnrollmentMutation
{
    
    [Authorize]
    public Task<string> EnrollmentCode(
        [Service()]RwfDbContext db,
        [Service] IdSerializer serializer,
        ClaimsPrincipal user,
        [ID] Guid campaingId )
    {
        // TODO create and store a invitation link with expiration
        return Task.FromResult(campaingId.ToString());
    }
    
    [Authorize]
    public async Task<CampaignEnrollment> EnrollmentAdd(
        [Service()] IIdSerializer serializer,
        [Service()] RwfDbContext db,
        ClaimsPrincipal user,
        string code,
        string playerName )
    {
        var id = serializer.Deserialize(code);

        var userId = user.GetId();
        var filter = Builders<Campaign>.Filter.Eq(c => c.Id, (Guid)id.Value);
        var enrollment = CampaignEnrollment.Create(userId, CampaignRoll.Player, playerName);
        var update = Builders<Campaign>.Update.AddToSet( f=> f.Participants, enrollment );
        
        var result = await db.Campaigns.UpdateOneAsync(filter, update);

        if (result.ModifiedCount != 1)
        {
            throw new DbException();
        }

        return enrollment;
    }
}