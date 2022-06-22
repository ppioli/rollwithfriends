using Server.EFModels.Character5E;

namespace Server.EFModels.Map;

public class Npc5EContent : IMapEntityContent {
    [ID(nameof(NonPlayerCharacter5E))]
    public int NpcId { get; set; }
    public int Width => 1;
    public int Height => 1;
}