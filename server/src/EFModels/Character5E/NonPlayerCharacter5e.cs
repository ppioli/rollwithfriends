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

    public Guid SourceId { get; set; }

    public NpcType5E Type { get; set; } = null!;

    public string HitPointsFormula { get; set; } = null!;
    public int HitPointsAverage { get; set; }

    public ArmorClassOption5E[] ArmorClasses { get; set; } = null!;

    // TODO Fix typo
    public double ChallangeRating { get; set; }

    public Alignment5E[] Alignments { get; set; } = null!;

    public Size5E[] Sizes { get; set; } = null!;
    public IDictionary<Ability5E, int> SavingThrows { get; set; } = null!;
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
        Guid sourceId,
        string hitPointsFormula,
        int hitPointsAverage,
        double challangeRating,
        IDictionary<Skill, int> skills,
        IDictionary<Ability5E, int> savingThrows,
        Size5E[] sizes,
        Alignment5E[] alignments,
        Language5E[] languages,
        Speed5E speed,
        Sense5E[] senses,
        Resistance5E[] resistances,
        ArmorClassOption5E[] armorClasses,
        NpcType5E type) : base(
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
        ClaimsPrincipal user
    )
    {
        // TODO Redoo
        return null;
        // var npc = dbContext
        //               .NonPlayerCharacters5E
        //            .Include(npc => npc.Source)
        //            .FirstOrDefault(s => s.Source.OwnerId == user.GetId() && s.Id == id) ??
        //        throw new EntityNotFound(id);
        //
        // 
        // var stry = JsonConvert.SerializeObject(npc, new JsonSerializerSettings()
        // {
        //     ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
        // });
        //
        // var deserialized = JsonConvert.DeserializeObject<NonPlayerCharacter5E>(stry); 
        //
        // return deserialized!;

    }
}