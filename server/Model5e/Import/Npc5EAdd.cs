namespace RollWithFriends.Models.Characters;

public class Npc5EAdd : CharacterBase5E
{
    public int Page { get; set; }
    public NpcType5E Type { get; set; } = null!;

    public string HitPointsFormula { get; set; } = null!;
    public int HitPointsAverage { get; set; }

    public ArmorClassOption5E[] ArmorClasses { get; set; } = null!;

    public double ChallangeRating { get; set; }
    
    // List of posible aligments
    public Alignment5E[] Alignments { get; set; } = null!;
    
    public Size5E[] Sizes { get; set; } = null!;

    public ICollection<KeyValuePair<Ability5E, int>> SavingThrows { get; set; } = null!;
    public ICollection<KeyValuePair<Skill, int>> Skills { get; set; } = null!;
}