namespace Api.EFModels
{
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Identity;

    public class User : IdentityUser
    {
        public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; } = default!;
        public virtual ICollection<IdentityUserLogin<string>> Logins { get; set; } = default!;
        public virtual ICollection<IdentityUserToken<string>> Tokens { get; set; } = default!;
        public virtual ICollection<ApplicationUserRole> UserRoles { get; set; } = default!;
    }

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

    public class ApplicationUserRole : IdentityUserRole<string>
    {
        public virtual User User { get; set; } = default!;
        public virtual ApplicationRole Role { get; set; } = default!;
    }
}