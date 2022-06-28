using Api.Services;
using Api.Services.Impl;
using server.Infraestructure;

namespace Server.Services
{
    public static class ServicesExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddTransient<IUsuarioService, UsuarioService>();
            services.AddSingleton<GoogleTokenValidator>();
            services.AddSingleton<FileStorageService>();
            services.AddSingleton<OidcExtractTokenHandler>();
            services.AddTransient<EnrollmentService>();
            services.AddTransient<CharacterService>();

            return services;
        }
    }
}