namespace Server.EFModels;

using Microsoft.AspNetCore.Identity;

public class User : IdentityUser
{
    public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; } = default!;
    public virtual ICollection<IdentityUserLogin<string>> Logins { get; set; } = default!;
    public virtual ICollection<IdentityUserToken<string>> Tokens { get; set; } = default!;
    public virtual ICollection<ApplicationUserRole> UserRoles { get; set; } = default!;
    public virtual ICollection<CampaignEnrollment> CampaignEnrollments { get; set; } = default!;
}