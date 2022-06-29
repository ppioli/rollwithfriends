namespace Server.EFModels;

[Node]
public class Participant
{
    [ID()]
    public int Id { get; set; }

    public string UserId { get; set; }
    public string Name { get; set; }
    public CampaignRoll CampaignRoll { get; set; }

    public Participant(int id, string userId, string name, CampaignRoll campaignRoll)
    {
        Id = id;
        UserId = userId;
        Name = name;
        CampaignRoll = campaignRoll;
    }

    public static Participant Get([ID] int id)
    {
        throw new NotImplementedException();
    }
}