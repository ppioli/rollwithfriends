using Server.Models;
using Server.Services;

namespace Server.Query;

public class RootQuery
{
    
    public static Campaign TestCampaign = Campaign.Create(1, "Test campaign", "This is a test campaign", new List<Scene>()
    {
        Scene.Create(1, "Test Scene", MapEntityService.Tokens),
    });


    [UseFiltering()]
    public ICollection<Campaign> Campaigns() => new List<Campaign>(){TestCampaign};
}