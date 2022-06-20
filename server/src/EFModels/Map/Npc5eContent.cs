namespace Server.EFModels.Map;

public class Npc5EContent : IMapEntityContent {
    public int NpcId { get; set; }
    public int Width => 1;
    public int Height => 1;
}