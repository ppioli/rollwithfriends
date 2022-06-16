namespace RollWithFriends.Models.Characters;

public class NpcAdd : CharacterBase
{
    public int Page { get; set; }
    public NpcType Type { get; set; } = null!;

    public string HitPointsFormula { get; set; } = null!;
    public int HitPointsAverage { get; set; }

    public ArmorClassOption[] ArmorClasses { get; set; } = null!;

    public double ChallangeRating { get; set; }
    
    // List of posible aligments
    public Alignment[] Alignments { get; set; } = null!;
    
    public Size[] Sizes { get; set; } = null!;

    public ICollection<KeyValuePair<Ability, int>> SavingThrows { get; set; } = null!;
    public ICollection<KeyValuePair<Skill, int>> Skills { get; set; } = null!;
}