namespace RollWithFriends.Models.Characters;

public class CharacterBase5E
{
    public string Name { get; set; } = null!;

    public Language5E[] Languages { get; set; } = null!;

    public Sense5E[] Senses { get; set; } = null!;

    public int PassivePerception { get; set; }

    public Resistance5E[] Resistances { get; set; } = null!;
    public Speed5E Speeds { get; set; } = null!;
    
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