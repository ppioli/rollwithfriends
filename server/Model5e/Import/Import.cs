using RollWithFriends.Models.Characters;

namespace Models.Import;

public class Import
{
    public SourceAdd Source { get; set; } = null!;

    public ICollection<NpcAdd> NonPlayerCharacters { get; set; } = default!;
}