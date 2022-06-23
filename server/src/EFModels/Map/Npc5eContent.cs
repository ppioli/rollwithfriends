using RollWithFriends.Models.Characters;
using Server.EFModels.Character5E;

namespace Server.EFModels.Map;

public class Npc5EContent : IMapEntityContent {
    [ID(nameof(NonPlayerCharacter5E))]
    public int NpcId { get; set; }
    public Size Size { get; set; }
    public int MaximumHp { get; set; }
    public int CurrentHp { get; set; }
    public int TemporaryHp { get; set; }
    public int Ac { get; set; }

    public int Width => Size.GetEditorSize();
    public int Height => Size.GetEditorSize();

    protected Npc5EContent()
    {
        
    }
    
    
    public Npc5EContent(int npcId, Size size, int maximumHp, int ac)
    {
        NpcId = npcId;
        Size = size;
        MaximumHp = maximumHp;
        CurrentHp = maximumHp;
        Ac = ac;
        TemporaryHp = 0;
    }
}