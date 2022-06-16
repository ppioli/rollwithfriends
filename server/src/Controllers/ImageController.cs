
using Microsoft.AspNetCore.Mvc;
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
        var file = _db.MapEntities.First(f => f.Id == mapEntityId).Image;

        if (!file.Loaded)
        {
            return NotFound();
        }

        var stream = _fileStorageService.ReadStream(file);

        return File(stream, file.ContentType!);

    }
}