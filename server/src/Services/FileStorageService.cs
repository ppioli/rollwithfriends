using Server.EFModels;
using server.Infraestructure;
using Path = System.IO.Path;

namespace Server.Services;

public class FileStorageService
{
    // Base dir where to store files
    private string BasePath { get; set; }

    private readonly IDictionary<int, UploadHandle> _uploads;

    public FileStorageService(IConfiguration configuration)
    {
        BasePath = configuration["FileStorage:BasePath"] ??
                   throw new Exception("The configuration FileStorage:BasePath is required");
        if (!Directory.Exists(BasePath))
        {
            Directory.CreateDirectory(BasePath);
        }

        _uploads = new Dictionary<int, UploadHandle>();
    }

    public void StartUpload(List<AppFile> files)
    {
        foreach (var file in files)
        {
            if (_uploads.ContainsKey(file.Id))
            {
                return;
            }
            _uploads[file.Id] = new UploadHandle()
            {
                File = file,
                TempFileName = Path.GetTempFileName(),
                Created = DateTime.UtcNow,
                Progress = 0,
            };
        }
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

    public void Complete(int fileId)
    {
        if (!_uploads.ContainsKey(fileId))
        {
            throw new ClientException("The upload has been cancelled");
        }

        var handle = _uploads[fileId];
        var dir = Path.Join(
            BasePath,
            handle.File.Subdirectory);

        if (!Directory.Exists(dir))
        {
            Directory.CreateDirectory(dir);
        }

        var dest = Path.Join(
            dir,
            $"{handle.File.Id}.{KnownTypes.GetExtension(handle.File.Type)}");
        
        File.Copy(handle.TempFileName, dest);
    }

    public string GetFilePath(AppFile file)
    {
        return Path.Join(
            BasePath,
            file.Subdirectory,
            $"{file.Id}.{KnownTypes.GetExtension(file.Type)}");
    }
    
    public UploadHandle GetHandle(int fileId)
    {
        return _uploads[fileId];
    }
}

public class UploadHandle
{
    public Guid Id { get; set; }
    public AppFile File { get; set; } = null!;
    public string TempFileName { get; set; } = null!;
    public DateTime Created { get; set; }
    public decimal Progress { get; set; }
}

public static class KnownTypes
{
    private static readonly Dictionary<string, string> Dict = new Dictionary<string, string>()
    {
        { "image/png", "png" },
        { "image/jpeg", "jpg" },
        { "image/jpg", "jpg" },
    };

    public static bool IsKnownType(string val) => Dict.ContainsKey(val);
    public static string GetExtension(string val) => Dict[val];
}