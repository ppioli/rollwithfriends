using Server.EFModels;
using Server.Models;

namespace Api.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IUsuarioService
    {
        Task<User> CreateUser( UsuarioInput input );
        Task<ICollection<User>> CreateUser( ICollection<UsuarioInput> input );
        Task CreateRole(string role);
        Task<User?> FindByNameAsync(string modelUsuario);
        Task Seed();
    }
}