using System.Security.Claims;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Server.AspNetCore;
using OpenIddict.Validation.AspNetCore;
using Server.Graphql.Mutations;
using server.Infraestructure;

namespace server.Controllers;

public class UserInfo
{
    public string Id { get; set; }

    public List<Tuple<string, string>> Claims { get; set; }
}

[ApiController]
[Route("/api/claims")]
public class TestController : Controller
{
    private readonly IUserService _userService;
    
    public TestController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    [Route("/seed")]
    public async Task<IActionResult> Seed()
    {
        await _userService.Seed();

        return new OkObjectResult("Ok");
    }

    
    [HttpPost]
    [Route("/test")]
    public Npcs5EAdd Test([FromBody] Npcs5EAdd input )
    {
        return input;
    }
}