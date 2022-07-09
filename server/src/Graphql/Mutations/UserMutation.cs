using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using MongoDB.Bson;
using MongoDB.Driver;
using Server.EFModels;
using server.Infraestructure;

namespace Server.Graphql.Mutations;

[ExtendObjectType("Mutation")]
public class UserMutation
{
    public async Task<ApplicationUser> UserAdd(
        [Service()] UserManager<ApplicationUser> userManager,
        UserAdd input)
    {
        var user = new ApplicationUser()
        {
            Email = input.Email,
            UserName = input.UserName,
        };
        var result = await userManager.CreateAsync(
            user,
            input.Password);

        if (!result.Succeeded)
        {
            throw new ClientException(result.Errors.First().Description);
        }

        return user;
    }


    
}
public record UserAdd(
    string UserName,
    string Password,
    string Email
)
{
}