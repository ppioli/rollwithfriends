using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.EFModels;

namespace server.Infraestructure;

public static class WebHostExtensions
{
    public static async Task InitializeDatabase(this IHost host)
    {
        using var scope = host.Services.CreateScope();
        var services = scope.ServiceProvider;
        var env = services.GetService<IHostEnvironment>();
        
        // var userService = services.GetService<UserManager<User>>();

        if (env.IsDevelopment() || env.IsStaging())
        {
            var context = services.GetService<RwfDbContext>()!;
            var userManager = services.GetService<UserManager<User>>();
            var configuration = services.GetService<IConfiguration>();
            
            await context.Database.MigrateAsync();

            Debug.Assert(configuration != null, nameof(configuration) + " != null");
            Debug.Assert(userManager != null, nameof(userManager) + " != null");
            
            var adminUsername = configuration["Admin:Username"];
            var adminPassword = configuration["Admin:Password"];
            
            var user = await userManager.FindByNameAsync(adminUsername);

            if (user == null)
            {
                user = new User()
                {
                    UserName = adminUsername
                };
                var result = await userManager.CreateAsync(user, adminPassword);

                if (!result.Succeeded)
                {
                    Console.WriteLine(result.Errors);
                }
            }

            // var test = new Campaign( description: "description")
            // {
            //     Description = "Description",
            //     Name = "Test",
            //     Scenes = new List<Scene>()
            //     {
            //         new()
            //         {
            //             Name = "Scene 1 ",
            //             Entities = new List<MapEntity>()
            //             {
            //                 new()
            //                 {
            //                     X = 10,
            //                     Y = 10,
            //                     Width = 10,
            //                     Height = 10
            //                 },
            //                 new()
            //                 {
            //                     X = 10,
            //                     Y = 10,
            //                     Width = 10,
            //                     Height = 10
            //                 }
            //             }
            //         },
            //         new()
            //         {
            //             Name = "Scene 1 ",
            //             Entities = new List<MapEntity>()
            //             {
            //                 new()
            //                 {
            //                     X = 10,
            //                     Y = 10,
            //                     Width = 10,
            //                     Height = 10
            //                 },
            //                 new()
            //                 {
            //                     X = 10,
            //                     Y = 10,
            //                     Width = 10,
            //                     Height = 10
            //                 }
            //             }
            //         }
            //     }
            // };
            // context.Add(test);
            //
            // await context.SaveChangesAsync();

            // await DatabaseSeeder.Seed(services);
        }

        // TODO Create admin user and roles
    }
}