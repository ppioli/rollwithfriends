using System.ComponentModel.DataAnnotations;
using Server.EFModels.Map;
using server.Infraestructure;

namespace Server.EFModels;

[Node]
public class Scene
{
    [ID]
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    
    public virtual Campaign Campaign { get; set; } = null!;
    public int CampaignId { get; set; }
    
    [GraphQLIgnore]
    public virtual ICollection<MapEntity> Entities { get; set; } = new List<MapEntity>();

    public IQueryable<MapEntity> GetEntities(RwfDbContext context) => context.MapEntities.Where(e => e.SceneId == Id);

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