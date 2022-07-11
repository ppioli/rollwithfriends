using RollWithFriends.Models.Characters;
using Server.EFModels.Entries;

namespace Server.EFModels.Map;

public class Npc5EContent : MapEntityContent {
    
    [ID(nameof(Npc5E))]
    public Guid NpcId { get; set; }
    public Size5E Size { get; set; }
    public int MaximumHp { get; set; }
    public int CurrentHp { get; set; }
    public int TemporaryHp { get; set; }
    public int Ac { get; set; }

    public float Width => GetEditorSize();
    public float Height => GetEditorSize();

    public float GetEditorSize()
    {
        return Size switch
        {
            Size5E.Tiny => 1f,
            Size5E.Small => 1f,
            Size5E.Medium => 1f,
            Size5E.Large => 2f,
            Size5E.Huge => 3f,
            Size5E.Gargantuan => 4f,
            _ => throw new ArgumentOutOfRangeException()
        };
    } 
    
    protected Npc5EContent()
    {
        
    }
    
    
    public Npc5EContent(Guid npcId, Size5E size, int maximumHp, int ac)
    {
        NpcId = npcId;
        Size = size;
        MaximumHp = maximumHp;
        CurrentHp = maximumHp;
        Ac = ac;
        TemporaryHp = 0;
    }
}