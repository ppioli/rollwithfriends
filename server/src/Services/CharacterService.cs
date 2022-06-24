using RollWithFriends.Models.Characters;
using Server.EFModels;
using Server.EFModels.Character5E;
using server.Infraestructure;
using Source = Server.EFModels.Source;

namespace Server.Services;

public class CharacterService
{
    private readonly RwfDbContext _db;

    public CharacterService(RwfDbContext db)
    {
        _db = db;
    }

    public async Task<ICollection<NonPlayerCharacter5E>> AddNonPlayerCharacters(
        Source source,
        IEnumerable<Npc5EAdd> payload)
    {
        
        var createdNpcs = payload.Select(
            input => new NonPlayerCharacter5E(
                input.Name,
                new AppFile(source.OwnerId, source.GetSubdirectory(), "image/*"),
                input.PassivePerception,
                input.Strength,
                input.Dexterity,
                input.Constitution,
                input.Intelligence,
                input.Wisdom,
                input.Charisma,
                input.Page,
                source.Id,
                input.HitPointsFormula,
                input.HitPointsAverage,
                input.ChallangeRating,
                new Dictionary<Skill, int>(input.Skills),
                new Dictionary<Ability5E, int>(input.SavingThrows),
                input.Sizes,
                input.Alignments,
                input.Languages,
                input.Speeds,
                input.Senses,
                input.Resistances,
                input.ArmorClasses,
                input.Type))
            .ToList();

        await _db.AddRangeAsync(createdNpcs);

        await _db.SaveChangesAsync();
        
        return createdNpcs;
    }
}