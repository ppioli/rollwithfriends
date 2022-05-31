namespace Server.EFModels;

using Microsoft.AspNetCore.Identity;


public class ApplicationUserRole : IdentityUserRole<string>
{
    public virtual User User { get; set; } = default!;
    public virtual ApplicationRole Role { get; set; } = default!;
}