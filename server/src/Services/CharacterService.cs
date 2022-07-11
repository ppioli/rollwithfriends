using server.Infraestructure;

namespace Server.Services;

public class CharacterService
{
    private readonly RwfDbContext _db;
    private readonly FileStorageService _storageService;

    public CharacterService(RwfDbContext db, FileStorageService storageService)
    {
        _db = db;
        _storageService = storageService;
    }

    // public async Task<ICollection<Npc5E>> AddNonPlayerCharacters(
    //     Source source,
    //     ClaimsPrincipal user,
    //     IEnumerable<Npc5EAdd> payload)
    // {
    //     var createdNpcs = new List<Npc5E>();
    //     foreach (var input in payload)
    //     {
    //         _storageService.TryCreateFromUpload(
    //             user,
    //             input.UploadId,
    //             $"source/{source.Id}",
    //             "image/*",
    //             out var file);
    //         var created = new Npc5E(
    //             input.Name,
    //             file,
    //             input.PassivePerception,
    //             input.Strength,
    //             input.Dexterity,
    //             input.Constitution,
    //             input.Intelligence,
    //             input.Wisdom,
    //             input.Charisma,
    //             input.Page,
    //             source.Id,
    //             input.HitPointsFormula,
    //             input.HitPointsAverage,
    //             input.ChallangeRating,
    //             new Dictionary<Skill, int>(input.Skills),
    //             new Dictionary<Ability5E, int>(input.SavingThrows),
    //             input.Sizes,
    //             input.Alignments,
    //             input.Languages,
    //             input.Speeds,
    //             input.Senses,
    //             input.Resistances,
    //             input.ArmorClasses,
    //             input.Type);
    //         
    //         createdNpcs.Add(created);
    //     }
    //
    //     return createdNpcs;
    // }
    //
    // public class Npc5EAdd : Npc5E
    // {
    //     [ID()]
    //     public Guid UploadId { get; set; }
    // }
}