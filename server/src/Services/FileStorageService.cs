using System.Diagnostics;
using System.Text.RegularExpressions;
using Server.EFModels;
using server.Infraestructure;
using Path = System.IO.Path;

namespace Server.Services;

public class FileStorageService
{
    // Base dir where to store files
    private string BasePath { get; set; }

    private readonly IDictionary<int, UploadHandle> _uploads;

    private readonly IServiceProvider _serviceProvider;

    public FileStorageService(IConfiguration configuration, IServiceProvider serviceProvider)
    {
        // TODO should clean uploads
        _serviceProvider = serviceProvider;
        BasePath = configuration["FileStorage:BasePath"] ??
                   throw new Exception("The configuration FileStorage:BasePath is required");
        if (!Directory.Exists(BasePath))
        {
            Directory.CreateDirectory(BasePath);
        }

        _uploads = new Dictionary<int, UploadHandle>();
    }

    public string StartUpload(string userId, int fileId, IFormFile formFile)
    {
        if (_uploads.ContainsKey(fileId))
        {
            return _uploads[fileId].TempFileName;
        }
        
        var file = LoadFile(fileId);
        
        if (file == null || file.OwnerId != userId)
        {
            throw new ClientException("You don't have permission to modify these files");
        }

        var fileExtension = Path.GetExtension(formFile.FileName);
        
        var expectedExtensionRegEx = new Regex(file.Accepts);

        if (!expectedExtensionRegEx.IsMatch(formFile.ContentType))
        {
            throw new ClientException($"The provided file does not match the expected file type {file.Accepts}");
        }
            
        var handle = new UploadHandle()
        {
            FileId = fileId,
            TempFileName = Path.GetTempFileName(),
            Extension = fileExtension,
            ContentType = formFile.ContentType,
            Created = DateTime.UtcNow,
            Progress = 0,
        };
            
        _uploads.Add(file.Id, handle);

        return handle.TempFileName;

    }

    public AppFile LoadFile(int fileId)
    {
        using var scope = _serviceProvider.CreateScope();
        var db = scope.ServiceProvider.GetService<RwfDbContext>();

        Debug.Assert(db != null, nameof(db) + " != null");
        return db.Files.Find(fileId) ?? throw new EntityNotFound(fileId);
    }

    public bool IsLoading(int fileId)
    {
        return _uploads.ContainsKey(fileId);
    }
    
    public void SetProgress(int fileId, decimal progress)
    {
        if (!_uploads.ContainsKey(fileId))
        {
            throw new ClientException("The upload has been cancelled");
        }

        _uploads[fileId].Progress = progress;
    }

    public async Task Complete(int fileId)
    {
        if (!_uploads.ContainsKey(fileId))
        {
            throw new ClientException("The upload has been cancelled");
        }
        
        using var scope = _serviceProvider.CreateScope();
        var db = scope.ServiceProvider.GetService<RwfDbContext>();

        Debug.Assert(db != null, nameof(db) + " != null");
        
        var handle = _uploads[fileId];

        var file = await db.Files.FindAsync(fileId) ?? throw new EntityNotFound(fileId);
        var dir = GetFileDirectory(file);
        if (!Directory.Exists(dir))
        {
            Directory.CreateDirectory(dir);
        }
        
        File.Copy(handle.TempFileName, GetFilePath(file));
        
        file.SetLoaded(handle.Extension, handle.ContentType);

        
        

        
        
        

        _uploads.Remove(fileId);

        await db.SaveChangesAsync();
    }

    public string GetFileDirectory(AppFile file)
    {
        return Path.Join(
            BasePath,
            file.Subdirectory);
    }

    public string GetFilePath(AppFile file)
    {
        return Path.Join(GetFileDirectory(file), $"{file.Id}.{file.Extension}");
    }

    public Stream ReadStream(AppFile file)
    {
        var path = GetFilePath(file);
        return new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read);
    }
}

public class FileResult
{
    public FileStream Stream { get; set; } = null!;
    public string ContentType { get; set; } = null!;
}

public class UploadHandle
{
    public Guid Id { get; set; }
    public int FileId { get; set; }
    public string TempFileName { get; set; } = null!;
    public DateTime Created { get; set; }
    public decimal Progress { get; set; }
    public string Extension { get; set; } = null!;
    public string ContentType { get; set; } = null!;
}
