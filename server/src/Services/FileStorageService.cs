using System.Security.Claims;
using System.Text.RegularExpressions;
using HotChocolate.AspNetCore.Authorization;
using Microsoft.AspNetCore.StaticFiles;
using Server.EFModels;
using server.Infraestructure;
using Path = System.IO.Path;

namespace Server.Services;

[Authorize]
public class FileStorageService
{
    // Base dir where to store files
    private string BasePath { get; set; }

    private readonly ILogger<FileStorageService> _logger;
    private readonly IDictionary<Guid, UploadHandle> _uploads;

    private readonly FileExtensionContentTypeProvider _contentTypeProvider;
    
    public FileStorageService(
        IConfiguration configuration,
        ILogger<FileStorageService> logger)
    {
        // TODO Should create a worker to clean uploads
        _logger = logger;
        BasePath = configuration["FileStorage:BasePath"] ??
                   throw new Exception("The configuration FileStorage:BasePath is required");
        
        _contentTypeProvider = new FileExtensionContentTypeProvider();
        if (!Directory.Exists(BasePath))
        {
            Directory.CreateDirectory(BasePath);
        }

        _uploads = new Dictionary<Guid, UploadHandle>();
    }

    public async Task<string> Upload(IFormFile file)
    {
        var fileExtension = Path.GetExtension(file.FileName);

        var handle = new UploadHandle()
        {
            TempFileName = Path.GetTempFileName(),
            Extension = fileExtension,
            ContentType = file.ContentType,
            Created = DateTime.UtcNow
        };

        {
            await using FileStream output = File.Create(handle.TempFileName);
            await using Stream input = file.OpenReadStream();

            int readBytes;
            var buffer = new byte[16 * 1024];
            while ((readBytes = await input.ReadAsync(buffer)) > 0)
            {
                await output.WriteAsync(buffer, 0, readBytes);
            }
        }
        var id = Guid.NewGuid();
        _uploads[id] = handle;
        return id.ToString();
    }
    
    
    public UploadHandle? GetFileHandle(Guid uploadId)
    {
        return _uploads.ContainsKey(uploadId) ? _uploads[uploadId] : null;
    }


    public string GetFileAbsolutePath(AppFile file)
    {
        
        return Path.Join(
            BasePath,
            file.RelativeFilePath);
    }
    
    
    public string GetFileContentType(AppFile file)
    {
        _contentTypeProvider.TryGetContentType(file.FileName, out var result);

        if (result == null)
        {
            throw new ApiException($"Could not determine the content type for the file {file.Id}");    
        }

        return result;
    }

    public Stream ReadStream(AppFile file)
    {
        if (file.Id == Guid.Empty)
        {
            throw new Exception("The given file does not have an id");
        }
        var path = GetFileAbsolutePath(file);
        return new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read);
    }
    
    public AppFile CreateFromUpload( ClaimsPrincipal user, Guid uploadId, string subdirectory, string accepts )
    {
        //TODO maybe add user and check that the upload belongs to it? 
        var upload = GetFileHandle(uploadId) ??
                     throw new ClientException("The provided upload no longer exists");
        
        var expectedExtensionRegEx = new Regex(accepts);

        if (!expectedExtensionRegEx.IsMatch(upload.ContentType))
        {
            throw new ClientException($"The provided file does not match the expected file type {accepts}");
        }

        var appFile = AppFile.Create(subdirectory, upload.Extension, user);

        var filePath = GetFileAbsolutePath(appFile);
        var directory = Path.GetDirectoryName(filePath)!;
        if (!Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }

        File.Move(upload.TempFileName, filePath);
        
        return appFile;
    }
    
    public bool TryCreateFromUpload( ClaimsPrincipal user, Guid uploadId, string subdirectory, string accepts, out AppFile? file)
    {
        
        try
        {
            file = CreateFromUpload(user, uploadId, subdirectory, accepts);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while copying the temp file to it's final destination");
        }

        file = null;
        return false;
    }
}

public class UploadHandle
{
    public Guid Id { get; set; }
    public string TempFileName { get; set; } = null!;
    public DateTime Created { get; set; }
    public string Extension { get; set; } = null!;
    public string ContentType { get; set; } = null!;
}