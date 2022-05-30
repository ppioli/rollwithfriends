using Server.Models;

namespace Api.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using EFModels;

    public interface IUsuarioService
    {
        IQueryable<User> Users { get; }
        Task<User> CreateUser( UsuarioInput input );
        Task<ICollection<User>> CreateUser( ICollection<UsuarioInput> input );
        Task CreateRole(string role);
        Task<User?> FindByNameAsync(string modelUsuario);
        // Task<LoginResponse> Login(string userName, string password);
    }
}