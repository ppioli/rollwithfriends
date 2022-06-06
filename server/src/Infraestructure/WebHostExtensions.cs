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
        var context = services.GetService<RwfDbContext>()!;

        // var userService = services.GetService<UserManager<User>>();
        
        if (env.IsDevelopment() || env.IsStaging())
        {
            await context.Database.MigrateAsync();


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