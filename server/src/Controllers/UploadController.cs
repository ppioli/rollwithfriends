using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Server.Graphql.Subscriptions;
using server.Infraestructure;
using Server.Services;

namespace server.Controllers;

[Controller]
[ApiController]
public class UploadController : Controller
{
    private readonly FileStorageService _fileStorageService;

    public UploadController(
        FileStorageService fileStorageService)
    {
        _fileStorageService = fileStorageService;
    }

    [HttpPost]
    [Authorize]
    [Route("Upload")]
    public async Task<string> Upload(IFormFile data)
    {
        return await _fileStorageService.Upload(data);
    }
}