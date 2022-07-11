using System.Security.Claims;
using HotChocolate.AspNetCore.Authorization;
using server.Infraestructure;
using Source = RollWithFriends.Models.Source;

namespace Server.Graphql.Mutations;

[ExtendObjectType("Mutation")]
public class SourceMutation
{
    [Authorize]
    public async Task<Source> SourceAdd(
        [Service()] RwfDbContext db,
        ClaimsPrincipal user,
        SourceAdd input)
    {
        
        // var source = new Source( user.GetId(), input.Name, input.Description, input.ShortName);
        //
        // await db.AddAsync(source);
        //
        // await db.SaveChangesAsync();
        //
        // return source;

        return null;
    }
}

public class SourceAdd
{
    
}