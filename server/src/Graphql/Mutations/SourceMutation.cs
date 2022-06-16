using System.Security.Claims;
using HotChocolate.AspNetCore.Authorization;
using RollWithFriends.Models.Characters;
using Server.EFModels;
using server.Infraestructure;

namespace Server.Graphql.Mutations;

[ExtendObjectType("Mutation")]
public class SourceMutation
{
    [Authorize]
    public async Task<Source> SourceAdd(
        RwfDbContext db,
        ClaimsPrincipal user,
        SourceAdd input)
    {
        
        var source = new Source( user.GetId(), input.Name, input.Description, input.ShortName);

        await db.AddAsync(source);

        await db.SaveChangesAsync();

        return source;
    }
}