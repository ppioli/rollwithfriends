using AspNetCore.Identity.Mongo.Model;
using Server.EFModels;
using server.Infraestructure;
using Server.Models;

namespace Api.Services.Impl
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Identity;


    public class UsuarioService : IUsuarioService
    {
        private readonly RoleManager<MongoRole> _roleManager;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public UsuarioService(
            RoleManager<MongoRole> roleManager,
            UserManager<User> userManager,
            IConfiguration configuration)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _configuration = configuration;
        }


        public async Task<User> CreateUser(UsuarioInput input)
        {
            var user = await _createUser(input);
            return user;
        }

        public async Task<ICollection<User>> CreateUser(ICollection<UsuarioInput> input)
        {
            var users = new List<User>();
            foreach (var usuario in input)
            {
                var user = await _createUser(usuario);

                users.Add(user);
            }


            return users;
        }

        private async Task<User> _createUser(UsuarioInput input)
        {
            var existingUser = await _userManager.FindByEmailAsync(input.Email);

            if (existingUser != null)
            {
                throw new ValidationException($"Ya existe un usuario con email {input.Email}");
            }

            var user = new User()
            {
                UserName = input.Username,
                Email = input.Email
            };
            await _userManager.CreateAsync(user, input.Password);

            foreach (var role in input.Roles)
            {
                await _userManager.AddToRoleAsync(user, role);
            }

            return user;
        }

        public async Task CreateRole(string role)
        {
            var roleExist = await _roleManager.RoleExistsAsync(role);
            if (roleExist)
            {
                throw new ValidationException($"El rol {role} ya existe");
            }

            await _roleManager.CreateAsync(new MongoRole(role));
        }

        public async Task<User?> FindByNameAsync(string userName)
        {
            return await _userManager.FindByNameAsync(userName);
        }

        public async Task Seed()
        {
            var adminData = _configuration.GetSection("Admin") ??
                            throw new Exception("You must provide AdminUserSection on config to initialize the db");
            
            var admin = new UsuarioInput(
                Email: adminData["Email"],
                Password: adminData["Password"],
                Username: adminData["Username"],
                Roles: new[] { "admin" });

            var adminUser = await FindByNameAsync(admin.Username);
            
            if (adminUser == null )
            {
                // TODO this will explode if configuration changes
                await CreateRole("admin");
                await CreateRole("user");
                await CreateUser(admin);
            }
            
            

            
        }
    }
}