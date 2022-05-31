namespace Server.EFModels;

using Microsoft.AspNetCore.Identity;


public class ApplicationRole : IdentityRole
{
    public ApplicationRole()
    {
    }

    public ApplicationRole(string roleName) : base(roleName)
    {
    }

    public virtual ICollection<ApplicationUserRole> UserRoles { get; set; } = default!;
}