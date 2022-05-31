using Duende.IdentityServer.Services;
using Server.Services;

namespace Api.Services
{
    using Impl;
    using Microsoft.Extensions.DependencyInjection;

    public static class ServicesExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddTransient<IMapEntityService, MapEntityService>();
            
            return services;
        }
    }
}