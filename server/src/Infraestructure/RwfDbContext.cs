using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.EFModels;
using Server.Models;

namespace server.Infraestructure;

public class RwfDbContext : IdentityDbContext<
    User, ApplicationRole, string,
    IdentityUserClaim<string>, ApplicationUserRole, IdentityUserLogin<string>,
    IdentityRoleClaim<string>, IdentityUserToken<string>>
{
    public DbSet<Campaign> Campaigns { get; set; } = null!;
    public DbSet<Scene> Scenes { get; set; } = null!;
    public DbSet<MapEntity> MapEntities { get; set; } = null!;
    public DbSet<CampaignEnrollment> CampaignEnrollments { get; set; } = null!;

    public RwfDbContext(DbContextOptions<RwfDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<User>(
            b =>
            {
                // Each User can have many UserClaims
                b.HasMany(e => e.Claims)
                    .WithOne()
                    .HasForeignKey(uc => uc.UserId)
                    .IsRequired();

                // Each User can have many UserLogins
                b.HasMany(e => e.Logins)
                    .WithOne()
                    .HasForeignKey(ul => ul.UserId)
                    .IsRequired();

                // Each User can have many UserTokens
                b.HasMany(e => e.Tokens)
                    .WithOne()
                    .HasForeignKey(ut => ut.UserId)
                    .IsRequired();

                // Each User can have many entries in the UserRole join table
                b.HasMany(e => e.UserRoles)
                    .WithOne(e => e.User)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();

                b.HasMany(u => u.CampaignEnrollments)
                    .WithOne(u => u.User);
            });

        modelBuilder.Entity<Campaign>(
            b =>
            {
                b.HasMany(c => c.Scenes)
                    .WithOne(s => s.Campaign)
                    .HasForeignKey( c => c.CampaignId);

                b.HasOne(c => c.SelectedScene)
                    .WithOne()
                    .HasForeignKey<Campaign>(c => c.SelectedSceneId)
                    .IsRequired(false);
            });
        
        
        modelBuilder.Entity<ApplicationRole>(
            b =>
            {
                // Each Role can have many entries in the UserRole join table
                b.HasMany(e => e.UserRoles)
                    .WithOne(e => e.Role)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();
            });
    }
}