
namespace Server.EFModels;

[Node]

public class CampaignEnrollment
{
    [ID]
    public int Id { get; set; }
    
    [GraphQLIgnore]
    public virtual User User { get; set; } = default!;

    public string UserId { get; set; } = default!;

    public virtual Campaign Campaign { get; set; } = default!;
    public int CampaignId { get; set; }

    protected CampaignEnrollment()
    {
        
    }

    public CampaignEnrollment(string userId)
    {
        UserId = userId;
    }

    public static CampaignEnrollment Get(int id)
    {
        throw new NotImplementedException();

    }
    
    
}