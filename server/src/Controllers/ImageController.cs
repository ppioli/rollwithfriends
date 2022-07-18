
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using MongoDB.Driver;
using Server.EFModels;
using Server.Graphql.Types;
using server.Infraestructure;
using Server.Services;

namespace server.Controllers;


[Controller]
public class ImageController : Controller
{
    private readonly FileStorageService _fileStorageService;
    private readonly RwfDbContext _db;
    private readonly IIdSerializer _idSerializer;
    
    public ImageController(FileStorageService fileStorageService, RwfDbContext db, IIdSerializer idSerializer)
    {
        _fileStorageService = fileStorageService;
        _idSerializer = idSerializer;
        _db = db;
    }

    
    [Route("[controller]/[action]/{mapEntityId}")]
    public IActionResult Token( string mapEntityId )
    {
        var id = (Guid)_idSerializer.Deserialize(mapEntityId).Value;
        var entity = _db.Scenes.AsQueryable()
            .SelectMany(s => s.Entities)
            .First(f => f.Id == id);

        AppFile? file = null;
        if (entity.Content is ImageContent content)
        {
            file = content.File;
        }

        if (file == null)
        {
            return NotFound();
        }
        var contentType = _fileStorageService.GetFileContentType(file);

        var stream = _fileStorageService.ReadStream(file);
        

        return File(stream, contentType );
    }
    
    [Route("[controller]/[action]/{npcId}")]
    public IActionResult NpcAvatar( string npcId )
    {
        // TODO authenticate this
        // var id = _idSerializer.Deserialize(npcId).Value;
        // var file = _db.NonPlayerCharacters5E.First(f => f.Id == (int)id)
        //     .Avatar;
        //
        // if (!file.Loaded)
        // {
        //     return NotFound();
        // }
        //
        // var stream = _fileStorageService.ReadStream(file);
        //
        // return File(stream, file.ContentType!);

        return null;

    }
}