namespace Server.EFModels;

public class Campaign
{
    [ID]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public virtual ICollection<Scene> Scenes { get; set; } = new List<Scene>();
    
    public virtual Scene? SelectedScene { get; set; }
    public int? SelectedSceneId { get; set; }

    public virtual ICollection<CampaignEnrollment> Participants { get; set; } = new List<CampaignEnrollment>();
    
    public Campaign(string name, string description)
    {
        Name = name;
        Description = description;
    }

    protected Campaign()
    {
        
    }
    
    public static Campaign Get(int id)
    {
        throw new NotImplementedException();

    }
    
    

}