using System.Globalization;
using System.Net;
using System.Text.RegularExpressions;
using System.Xml.Schema;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.StaticFiles;
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
    private readonly FileExtensionContentTypeProvider _fileExtension;
    
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
        _fileExtension = new FileExtensionContentTypeProvider();
    }
    
    [HttpPost]
    [Authorize]
    [Route("Upload/{fileId}")]
    public async Task<IActionResult> Upload(int fileId, IFormFile data)
    {
        
        var tempFile = _fileStorageService.StartUpload(HttpContext.User.GetId(), fileId, data);
        
        var buffer = new byte[16 * 1024];
        var source = data;
        var totalBytes = source.Length;
        {
            await using FileStream output = System.IO.File.Create(tempFile);
            await using Stream input = source.OpenReadStream();

            long totalReadBytes = 0;
            int readBytes;

            while ((readBytes = await input.ReadAsync(buffer)) > 0)
            {
                await output.WriteAsync(buffer, 0, readBytes);
                totalReadBytes += readBytes;
            }
        }

        await _fileStorageService.Complete(fileId);

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