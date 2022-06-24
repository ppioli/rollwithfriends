using System.Linq.Expressions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;
using RollWithFriends.Models.Characters;
using Server.EFModels;
using Server.EFModels.Character5E;
using Server.EFModels.Map;
using Server.EFModels.Messages;
using Source = Server.EFModels.Source;

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
    public DbSet<AppFile> Files { get; set; } = null!;
    public DbSet<Message> Messages { get; set; } = null!;
    
    public DbSet<NonPlayerCharacter5E> NonPlayerCharacters5E { get; set; } = null!;
    public DbSet<Source> Sources { get; set; } = null!;

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

        // TODO Add entity comparator
        modelBuilder.Entity<NonPlayerCharacter5E>(
            b =>
            {
                b.Property(npc => npc.Skills)
                    .HasConversion( new JsonValueConverter<IDictionary<Skill, int>>());
                
                b.Property(npc => npc.Sizes)
                    .HasConversion(
                        s => JsonConvert.SerializeObject(s),
                        dbValue => JsonConvert.DeserializeObject<Size5E[]>(dbValue));
                        
                b.Property(npc => npc.SavingThrows)
                    .HasConversion(new JsonValueConverter<IDictionary<Ability5E, int>>());
                
                b.Property(npc => npc.Alignments)
                    .HasConversion(new JsonValueConverter<Alignment5E[]>());
                
                b.Property(npc => npc.ArmorClasses)
                    .HasConversion( new JsonValueConverter<ArmorClassOption5E[]>());
                
                b.Property(npc => npc.Type)
                    .HasConversion( new JsonValueConverter<NpcType5E>());
                
                b.Property(npc => npc.Languages)
                    .HasConversion( new JsonValueConverter<Language5E[]>());
                
                b.Property(npc => npc.Senses)
                    .HasConversion( new JsonValueConverter<Sense5E[]>());
                
                b.Property(npc => npc.Resistances)
                    .HasConversion( new JsonValueConverter<Resistance5E[]>());
                
                b.Property(npc => npc.Speeds)
                    .HasConversion( new JsonValueConverter<Speed5E>());
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

public class JsonValueConverter<T> : ValueConverter<T, string>
{
    public JsonValueConverter() : base( v => JsonConvert.SerializeObject(v),
        v => JsonConvert.DeserializeObject<T>(v))
    {
        
        
    }

}