using System.Globalization;
using System.Net;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Net.Http.Headers;
using Polly;
using Server.EFModels;
using Server.Graphql.Subscriptions;
using server.Infraestructure;
using Server.Services;

namespace server.Controllers;

[Controller]
public class UploadController : Controller
{
    private readonly FileStorageService _fileStorageService;
    private readonly ILogger<UploadController> _logger;
    private readonly RwfDbContext _db;
    private readonly ITopicEventSender _sender;

    public UploadController(
        FileStorageService fileStorageService,
        RwfDbContext db,
        ITopicEventSender sender,
        ILogger<UploadController> logger)
    {
        _fileStorageService = fileStorageService;
        _db = db;
        _sender = sender;
        _logger = logger;
    }
    
    [HttpPost]
    [Authorize]
    [Route("Upload/{fileId}")]
    public async Task<IActionResult> Upload(int fileId, IFormFile data)
    {
        var file = await _db.Files.FindAsync(fileId);

        if (file == null || file.OwnerId != HttpContext.User.GetId())
        {
            throw new ClientException("You don't have permission to modify these files");
        }


        _fileStorageService.StartUpload(new List<AppFile>() { file });


        var buffer = new byte[16 * 1024];
        var source = data;
        var totalBytes = source.Length;

        var handle = _fileStorageService.GetHandle(file.Id);

        {
            await using FileStream output = System.IO.File.Create(handle.TempFileName);
            await using Stream input = source.OpenReadStream();

            long totalReadBytes = 0;
            int readBytes;

            while ((readBytes = await input.ReadAsync(buffer)) > 0)
            {
                await output.WriteAsync(buffer, 0, readBytes);
                totalReadBytes += readBytes;
            }
        }

        _fileStorageService.Complete(file.Id);

        file.Loaded = true;

        await _db.SaveChangesAsync();

        await _sender.SendAsync(
            FileLoadingSubscription.GetTopic(fileId),
            new FileLoadingMessage()
            {
                Progress = 100
            });

        return Content("Success");
    }

}

public class FileUploadRequest
{
    public FileUpload[] Files { get; init; } = null!;
}

public class FileUpload
{
    public int FileId { get; init; }
    public IFormFile Data { get; init; } = null!;
}