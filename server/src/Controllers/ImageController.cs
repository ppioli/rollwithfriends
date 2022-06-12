using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Infraestructure;
using Server.Services;

namespace server.Controllers;


[Controller]
public class ImageController : Controller
{
    private readonly FileStorageService _fileStorageService;
    private readonly RwfDbContext _db;
    
    public ImageController(FileStorageService fileStorageService, RwfDbContext db)
    {
        _fileStorageService = fileStorageService;
        _db = db;
    }

    
    [Route("[controller]/[action]/{mapEntityId}")]
    public IActionResult Token( int mapEntityId )
    {
        // TODO enable authentication
        //get Image file using _fileservice from db

        // var authorized = _db.MapEntities
        //     .Where(e => e.Id == mapEntityId)
        //     .SelectMany(e => e.Scene.Campaign.Participants)
        //     .Any(p => p.UserId == HttpContext.User.GetId());
        //
        // if (!authorized)
        // {
        //     return NotFound();
        // }

        var file = _db.MapEntities.First(f => f.Id == mapEntityId).Image;

        var filePath = _fileStorageService.GetFilePath(file);

        var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read);

        return File(stream, file.Type);

    }
}