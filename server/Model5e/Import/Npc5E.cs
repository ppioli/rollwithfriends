namespace RollWithFriends.Models.Characters;

public class Npc5EExport
{
    public int Page { get; set; }
    public NpcType5E Type { get; set; } = null!;

    public string HitPointsFormula { get; set; } = null!;
    public int HitPointsAverage { get; set; }

    public ArmorClassOption5E[] ArmorClasses { get; set; } = null!;

    public double ChallangeRating { get; set; }
    
    // List of possible alignments
    public Alignment5E[] Alignments { get; set; } = null!;
    
    public Size5E[] Sizes { get; set; } = null!;

    public ICollection<KeyValuePair<Ability5E, int>> SavingThrows { get; set; } = null!;
    public ICollection<KeyValuePair<Skill, int>> Skills { get; set; } = null!;
    
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