using System.Diagnostics;
using Api.Services;
using Server.Models;

namespace server.Infraestructure;

public class DatabaseSeeder
{
    public static async Task Seed(IServiceProvider services)
    {
        var userService = services.GetService<IUsuarioService>();
        var configuration = services.GetService<IConfiguration>();

        Debug.Assert(userService != null, nameof(userService) + " != null");
        Debug.Assert(configuration != null, nameof(configuration) + " != null");

        if (userService.Users.Any())
        {
            return;
        }

        await userService.CreateRole("admin");
        await userService.CreateRole("user");
        var adminData = configuration.GetSection("AdminUser") ??
                        throw new Exception("You must provide AdminUserSection on config to initialize the db");

        var admin = new UsuarioInput(
            Email: adminData["Email"],
            Password: adminData["Password"],
            Username: adminData["Username"],
            Roles: new[] { "admin" });


        await userService.CreateUser(admin);
    }
}