using System.Security.Claims;
using HotChocolate.AspNetCore.Authorization;
using RollWithFriends.Models.Characters;
using Server.EFModels.Character5E;
using server.Infraestructure;
using Server.Services;

namespace Server.Graphql.Mutations;

[ExtendObjectType("Mutation")]
public class NonPlayerCharacterMutation
{
    
    [Authorize]
    public async Task<ICollection<NonPlayerCharacter5E>> Npcs5EAdd(
        ClaimsPrincipal user,
        RwfDbContext db,
        [Service()] CharacterService characterService,
        Npcs5EAdd input
        )
    {
        var source = await db.Sources.FindAsync(input.SourceId);

        if (source == null)
        {
            throw new EntityNotFound(input.SourceId);
        }

        if (source.OwnerId != user.GetId())
        {
            throw new NotAuthorizedException();
        }

        var addedCharacters = await characterService.AddNonPlayerCharacters(source, input.Characters);

        return addedCharacters;
    }
}

public class Npcs5EAdd
{
    [ID]
    public int SourceId { get; set; }

    public NpcAdd[] Characters { get; set; } = null!;
}