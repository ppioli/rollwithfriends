using RollWithFriends.Models.Characters;

namespace Models.Import;

public class Import
{
    public Source? Source { get; set; } 

    public ICollection<NonPlayerCharacter> NonPlayerCharacters { get; set; } = default!;
}