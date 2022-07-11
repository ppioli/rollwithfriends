using RollWithFriends.Models.Characters;

namespace Server.EFModels.Entries;


public class Npc5E : Npc5EExport, IEntry
{
    [ID()]
    public Guid Id { get; set; }
}