namespace Server.EFModels;

public class InvitationCodePayload
{
    public string CampaignId { get; set; }
    public DateTime Until { get; set; }
}