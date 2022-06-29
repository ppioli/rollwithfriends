using System.ComponentModel.DataAnnotations;
using Api.Services;
using AspNetCore.Identity.Mongo.Model;
using Microsoft.AspNetCore.Identity;
using Server.EFModels;
using Server.Models;

namespace Server.Services.Impl
{
    public class UserService : IUserService
    {
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        public UserService(
            RoleManager<ApplicationRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _configuration = configuration;
        }


        public async Task<ApplicationUser> CreateUser(UsuarioInput input)
        {
            var user = await _createUser(input);
            return user;
        }

        public async Task<ICollection<ApplicationUser>> CreateUser(ICollection<UsuarioInput> input)
        {
            var users = new List<ApplicationUser>();
            foreach (var usuario in input)
            {
                var user = await _createUser(usuario);

                users.Add(user);
            }


            return users;
        }

        private async Task<ApplicationUser> _createUser(UsuarioInput input)
        {
            var existingUser = await _userManager.FindByEmailAsync(input.Email);

            if (existingUser != null)
            {
                throw new ValidationException($"Ya existe un usuario con email {input.Email}");
            }

            var user = new ApplicationUser()
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

            await _roleManager.CreateAsync(new ApplicationRole(role));
        }

        public async Task<ApplicationUser?> FindByNameAsync(string userName)
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
                if (!await _roleManager.RoleExistsAsync("admin"))
                {
                    await CreateRole("admin"); 
                }
                
                if (!await _roleManager.RoleExistsAsync("user"))
                {
                    await CreateRole("user"); 
                }
                await CreateUser(admin);
            }
            
            

            
        }
    }
}