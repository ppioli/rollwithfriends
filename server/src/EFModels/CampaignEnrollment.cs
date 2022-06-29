
namespace Server.EFModels;

public class CampaignEnrollment
{
    [ID]
    public Guid UserId { get; set; } = default!;
    
    public CampaignEnrollment(Guid userId)
    {
        UserId = userId;
    }
}