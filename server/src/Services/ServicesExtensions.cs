using server.Infraestructure;

namespace Server.Services
{
    public static class ServicesExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddSingleton<GoogleTokenValidator>();
            services.AddSingleton<FileStorageService>();
            services.AddSingleton<OidcExtractTokenHandler>();
            services.AddTransient<EnrollmentService>();
            services.AddTransient<CharacterService>();

            return services;
        }
    }
}