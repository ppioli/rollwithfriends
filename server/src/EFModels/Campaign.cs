namespace Server.Models;

[Node]
public class Campaign
{
    [ID]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public virtual Scene? SelectedScene { get; set; }
    
    public virtual ICollection<Scene> Scenes { get; set; } = default!;

    public static Campaign Get(int id)
    {
        throw new NotImplementedException();
    }

    private Campaign()
    {
        Name = "";
        Description = "";
    }

    public static Campaign Create(int id, string name, string description, ICollection<Scene> scenes)
    {
        return new Campaign()
        {
            Id = id,
            Name = name,
            Description = description,
            Scenes = scenes,
            SelectedScene = scenes.FirstOrDefault(), 
        };
    }

}