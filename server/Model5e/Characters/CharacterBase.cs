namespace RollWithFriends.Models.Characters;

public class CharacterBase
{
    public string Name { get; set; } = null!;
    
    public Alignment? Alignment { get; set; }

    public int ArmorClass { get; set; }

    public int HitPoints { get; set; }

    public Language[] Languages { get; set; } = null!;

    public Sense[] Senses { get; set; } = null!;

    public int PassivePerception { get; set; }

    public Resistance[] Resistances { get; set; } = null!;

    public Size Size { get; set; }
    public Speed Speeds { get; set; } = null!;
    
    public int Strength { get; set; }
    public int Dexterity { get; set; }
    public int Constitution { get; set; }
    public int Intelligence { get; set; }
    public int Wisdom { get; set; }
    public int Charisma { get; set; }
    
}

public enum Skill
{
    Acrobatics,
    AnimalHandling,
    Arcana,
    Athletics,
    Deception,
    History,
    Insight,
    Intimidation,
    Investigation,
    Medicine,
    Nature,
    Perception,
    Performance,
    Persuasion,
    Religion,
    SleightOfHand,
    Stealth,
    Survival,
}