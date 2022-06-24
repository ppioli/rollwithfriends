
using RollWithFriends.Models.Characters;

namespace Server.EFModels.Character5E;

public class CharacterBase5E
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public int AvatarId { get; set; }

    [GraphQLIgnore]
    public virtual AppFile Avatar { get; set; } = null!;


    public Language5E[] Languages { get; set; }


    public Sense5E[] Senses { get; set; }

    public int PassivePerception { get; set; }


    public Resistance5E[] Resistances { get; set; }

    public Speed5E Speeds { get; set; }

    public int Strength { get; set; }
    public int Dexterity { get; set; }
    public int Constitution { get; set; }
    public int Intelligence { get; set; }
    public int Wisdom { get; set; }
    public int Charisma { get; set; }

    protected CharacterBase5E()
    {
    }

    public CharacterBase5E(
        string name,
        AppFile file,
        int passivePerception,
        int strength,
        int dexterity,
        int constitution,
        int intelligence,
        int wisdom,
        int charisma,
        Language5E[] languages,
        Speed5E speed,
        Sense5E[] senses,
        Resistance5E[] resistances)
    {
        Name = name;
        Avatar = file;
        PassivePerception = passivePerception;
        Strength = strength;
        Dexterity = dexterity;
        Constitution = constitution;
        Intelligence = intelligence;
        Wisdom = wisdom;
        Languages = languages;
        Charisma = charisma;
        Resistances = resistances;
        Speeds = speed;
        Senses = senses;
    }
}