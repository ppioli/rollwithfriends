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
    private readonly IUsuarioService _usuarioService;
    
    public TestController(IUsuarioService usuarioService)
    {
        _usuarioService = usuarioService;
    }

    [HttpGet]
    [Route("/seed")]
    public async Task<IActionResult> Seed()
    {
        await _usuarioService.Seed();

        return new OkObjectResult("Ok");
    }

    [HttpGet]
    [Authorize()]
    [Route("/userInfo")]
    public UserInfo Get()
    {
        return new UserInfo()
        {
            Id = User.GetId(),
            Claims = User.Claims.Select( c => new Tuple<string, string>(c.Type, c.Value)).ToList()
        };
    }
    
    [HttpPost]
    [Route("/test")]
    public Npcs5EAdd Test([FromBody] Npcs5EAdd input )
    {


        return input;
    }
}