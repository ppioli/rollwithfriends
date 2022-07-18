using RollWithFriends.Models.Characters;

namespace Server.EFModels.Entries;


public class Npc5E : Npc5EExport, IEntry
{
    [ID()]
    public Guid Id { get; set; }
    public Guid SourceId { get; set; }
    public Guid OwnerId { get; set; }

    public AppFile Avatar { get; set; } = null!;
}