using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Infraestructure;

namespace server.Controllers;

public class UserInfo
{
    public string Id { get; set; }

    public Dictionary<string, string> Claims { get; set; }
}

[ApiController]
[Route("/api/claims")]
public class TestController : Controller
{
    [HttpGet]
    [Authorize]
    [Route("userInfo")]
    public UserInfo Get()
    {
        return new UserInfo()
        {
            Id = User.GetId(),
            Claims = User.Claims.ToDictionary(claim => claim.Type, claim => claim.Value)
        };
    }
}