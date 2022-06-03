
namespace Server.EFModels;

[Node]

public class CampaignEnrollment
{
    [ID]
    public int Id { get; set; }
    
    [GraphQLIgnore]
    public virtual User User { get; set; } = default!;

    public string UserId { get; set; } = default!;

    public Rol Rol { get; set; }
    
    public virtual Campaign Campaign { get; set; } = default!;
    public int CampaignId { get; set; }

    protected CampaignEnrollment()
    {
        
    }

    public CampaignEnrollment(string userId, Rol rol)
    {
        UserId = userId;
        Rol = rol;
    }

    public static CampaignEnrollment Get(int id)
    {
        throw new NotImplementedException();

    }
    
    
}