
namespace Server.EFModels;

public class CampaignEnrollment
{
    [ID]
    public Guid UserId { get; set; } = Guid.Empty;

    public string PlayerName { get; set; } = null!;

    public CampaignRoll Roll { get; set; }
    
    private CampaignEnrollment()
    {
        
    }

    public static CampaignEnrollment Create(Guid userId, CampaignRoll roll, string playerName)
    {
        return new CampaignEnrollment()
        {
            PlayerName = playerName,
            UserId = userId,
            Roll = roll,
        };
    }
}