
namespace Server.EFModels;

using Server.Models;

[Node]
public class CampaignEnrollment
{
    public int Id { get; set; }
    
    [GraphQLIgnore]
    public virtual User User { get; set; } = null!;
    public string UserId { get; set; } = null!;
    
    public virtual Campaign Campaign { get; set; } = null!;
    public int CampaignId { get; set; }
    
    public static Scene Get(int id)
    {
        throw new NotImplementedException();

    }
}