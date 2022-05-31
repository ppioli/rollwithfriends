using Microsoft.EntityFrameworkCore;

namespace server.Infraestructure;

public static class WebHostExtensions
{
    public static async Task InitializeDatabase(this IHost host)
    {
        using var scope = host.Services.CreateScope();
        var services = scope.ServiceProvider;
        var env = services.GetService<IHostEnvironment>();
        var context = services.GetService<RwfDbContext>()!;

        if (env.IsDevelopment() || env.IsStaging())
        {
            await context.Database.MigrateAsync();
            // await DatabaseSeeder.Seed(services);
        }
    }
}