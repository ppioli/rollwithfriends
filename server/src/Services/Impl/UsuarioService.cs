using server.Infraestructure;
using Server.Models;

namespace Api.Services.Impl
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    
    using System.Threading.Tasks;
    using AutoMapper;
    using EFModels;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Configuration;


    public class UsuarioService : IUsuarioService
    {
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly UserManager<User> _userManager;
        private readonly RwfDbContext _dbContext;

        public UsuarioService(RoleManager<ApplicationRole> roleManager,
            UserManager<User> userManager,
            RwfDbContext dbContext)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _dbContext = dbContext;
        }

        public IQueryable<User> Users => _dbContext.Users;

        public async Task<User> CreateUser( UsuarioInput input )
        {
            await using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {

                var user = await _createUser(input);
                await transaction.CommitAsync();
                
                return user;
            }
            catch ( Exception )
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<ICollection<User>> CreateUser(ICollection<UsuarioInput> input)
        {
            await using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                var users = new List<User>();
                foreach (var usuario in input)
                {
                    var user = await _createUser(usuario);

                    users.Add(user);
                }
                
                await transaction.CommitAsync();
                
                return users;
            }
            catch ( Exception )
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        private async Task<User> _createUser(UsuarioInput input)
        {
            var existingUser = await _userManager.FindByEmailAsync(input.Email);
            
            if ( existingUser != null)
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
            
            await _roleManager.CreateAsync(new ApplicationRole(role));
        }

        public async Task<User?> FindByNameAsync(string userName)
        {
            return await _userManager.FindByNameAsync(userName);
        }
    }
    
    
}