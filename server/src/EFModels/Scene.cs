namespace Server.EFModels;

public class Scene
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    public virtual Campaign Campaign { get; set; } = null!;
    public int CampaignId { get; set; }
    
    public virtual ICollection<MapEntity> Entities { get; set; } = null!;
    
    public virtual Campaign MainScene { get; set; }

    public static Scene Create(int id, string name, ICollection<MapEntity> tokens)
    {
        return new Scene()
        {
            Id = id,
            Entities = new List<MapEntity>(tokens),
            Name = name,
        };
    }
}