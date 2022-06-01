namespace Server.EFModels;

public class Campaign
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    
    public string Owner { get; set; }

    public virtual ICollection<Scene> Scenes { get; set; }
    
    public virtual Scene SelectedScene { get; set; }
    public int? SelectedSceneId { get; set; }
    
    public virtual ICollection<CampaignEnrollment> CampaignEnrollments { get; set; }
    
    public Campaign()
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
            // SelectedScene = scenes.FirstOrDefault(), 
        };
    }

}