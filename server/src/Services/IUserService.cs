using Server.EFModels;
using Server.Models;

namespace Api.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IUserService
    {
        Task<ApplicationUser> CreateUser( UsuarioInput input );
        Task<ICollection<ApplicationUser>> CreateUser( ICollection<UsuarioInput> input );
        Task CreateRole(string role);
        Task<ApplicationUser?> FindByNameAsync(string modelUsuario);
        Task Seed();
    }
}