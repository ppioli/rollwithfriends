
using Microsoft.AspNetCore.Mvc;
using Server.EFModels;
using Server.EFModels.Map;
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
        var id = (int)_idSerializer.Deserialize(mapEntityId).Value;
        var entity = _db.MapEntities.First(f => f.Id == id);

        AppFile? file = null;
        if (entity.Type  == MapEntityType.Image)
        {
            var content = entity.GetImageContent();
            file = _db.Files.Find(content.FileId) ?? throw new EntityNotFound(mapEntityId);
        }

        if (entity.Type == MapEntityType.Npc5E)
        {
            var content = entity.GetNpc5EContent();
            file = _db.NonPlayerCharacters5E.Find(content.NpcId)?.Avatar ??
                   throw new EntityNotFound(mapEntityId);
        }
        if (file == null || !file.Loaded)
        {
            return NotFound();
        }

        var stream = _fileStorageService.ReadStream(file);

        return File(stream, file.ContentType!);

    }
    
    [Route("[controller]/[action]/{npcId}")]
    public IActionResult NpcAvatar( string npcId )
    {
        // TODO authenticate this
        var id = _idSerializer.Deserialize(npcId).Value;
        var file = _db.NonPlayerCharacters5E.First(f => f.Id == (int)id)
            .Avatar;

        if (!file.Loaded)
        {
            return NotFound();
        }

        var stream = _fileStorageService.ReadStream(file);

        return File(stream, file.ContentType!);

    }
}