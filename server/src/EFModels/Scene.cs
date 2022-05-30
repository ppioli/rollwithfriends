namespace Server.Models;

[Node]
public class Scene
{
    [ID]
    public int Id { get; set; }
    public string Name { get; set; }
    
    
    public virtual ICollection<MapEntity> Entities { get; set; } = default!;

    private Scene()
    {
        Name = "";
    }
    
    public static Scene Get(int id)
    {
        throw new NotImplementedException();

    }

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