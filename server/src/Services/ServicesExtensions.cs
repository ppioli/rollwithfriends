namespace Server.Services
{
    public static class ServicesExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddSingleton<GoogleTokenValidator>();
            
            return services;
        }
    }
}