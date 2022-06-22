using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RollWithFriends.Models.Characters;
using server.Infraestructure;

namespace Server.EFModels.Character5E;

[Node(IdField = "Id")]
public class NonPlayerCharacter5E : CharacterBase5E
{
    public int Page { get; set; }

    public int SourceId { get; set; }
    public virtual Source Source { get; set; } = null!;

    public NpcType Type { get; set; } = null!;

    public string HitPointsFormula { get; set; } = null!;
    public int HitPointsAverage { get; set; }

    public ArmorClassOption[] ArmorClasses { get; set; } = null!;

    public double ChallangeRating { get; set; }

    public Alignment[] Alignments { get; set; } = null!;

    public Size[] Sizes { get; set; } = null!;
    public IDictionary<Ability, int> SavingThrows { get; set; } = null!;
    public IDictionary<Skill, int> Skills { get; set; } = null!;

    protected NonPlayerCharacter5E()
    {
    }

    public NonPlayerCharacter5E(
        string name,
        AppFile file,
        int passivePerception,
        int strength,
        int dexterity,
        int constitution,
        int intelligence,
        int wisdom,
        int charisma,
        int page,
        int sourceId,
        string hitPointsFormula,
        int hitPointsAverage,
        double challangeRating,
        IDictionary<Skill, int> skills,
        IDictionary<Ability, int> savingThrows,
        Size[] sizes,
        Alignment[] alignments,
        Language[] languages,
        Speed speed,
        Sense[] senses,
        Resistance[] resistances,
        ArmorClassOption[] armorClasses,
        NpcType type) : base(
        name,
        file,
        passivePerception,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        languages,
        speed,
        senses,
        resistances)
    {
        Page = page;
        HitPointsFormula = hitPointsFormula;
        HitPointsAverage = hitPointsAverage;
        ChallangeRating = challangeRating;
        SourceId = sourceId;
        Skills = skills;
        SavingThrows = savingThrows;
        Sizes = sizes;
        Alignments = alignments;
        ArmorClasses = armorClasses;
        Type = type;
    }

    [Authorize]
    [GraphQLType(typeof(NonPlayerCharacter5E))]
    public static async Task<NonPlayerCharacter5E> Get(int id,
        ClaimsPrincipal user,
        RwfDbContext dbContext
        )
    {
        var npc = dbContext
                      .NonPlayerCharacters5E
                   .Include(npc => npc.Source)
                   .FirstOrDefault(s => s.Source.OwnerId == user.GetId() && s.Id == id) ??
               throw new EntityNotFound(id);
        
        // TODO HACK Work around for ef proxies
        var stry = JsonConvert.SerializeObject(npc, new JsonSerializerSettings()
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
        });

        var deserialized = JsonConvert.DeserializeObject<NonPlayerCharacter5E>(stry); 

        return deserialized!;

    }
}