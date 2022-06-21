using System.ComponentModel.DataAnnotations;
using Server.EFModels.Map;

namespace Server.EFModels;

[Node]
public class Scene
{
    [ID]
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    
    public virtual Campaign Campaign { get; set; } = null!;
    public int CampaignId { get; set; }
    
    public virtual ICollection<MapEntity> Entities { get; set; } = new List<MapEntity>();
    
    protected Scene() {}

    public Scene(string name)
    {
        Name = name;
    }

    public static Scene Get(int id)
    {
        throw new NotImplementedException();
    }
}