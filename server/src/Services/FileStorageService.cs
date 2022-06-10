using Server.EFModels;
using server.Infraestructure;
using Path = System.IO.Path;

namespace Server.Services;

public class FileStorageService
{
    // Base dir where to store files
    private string BasePath { get; set; }

    private readonly IDictionary<Guid, UploadHandle> _uploads;

    public FileStorageService(IConfiguration configuration)
    {
        BasePath = configuration["FileStorage:BasePath"] ??
                   throw new Exception("The configuration FileStorage:BasePath is required");
        if (!Directory.Exists(BasePath))
        {
            Directory.CreateDirectory(BasePath);
        }

        _uploads = new Dictionary<Guid, UploadHandle>();
    }

    public IEnumerable<UploadHandle> StartUpload(List<AppFile> files)
    {
        var handles = files.Select(
                f => new UploadHandle()
                {
                    Id = Guid.NewGuid(),
                    File = f,
                    TempFileName = Path.GetTempFileName(),
                })
            .ToList();

        foreach (var fileHandle in handles)
        {
            _uploads[fileHandle.Id] = fileHandle;
        }

        return handles;
    }

    public void SetProgress(Guid id, decimal progress)
    {
        if (!_uploads.ContainsKey(id))
        {
            throw new ClientException("The upload has been cancelled");
        }

        _uploads[id].Progress = progress;
    }

    public void Complete(Guid id)
    {
        if (!_uploads.ContainsKey(id))
        {
            throw new ClientException("The upload has been cancelled");
        }

        var handle = _uploads[id];
        var dest = Path.Join(
            BasePath,
            handle.File.Subdirectory,
            $"{handle.File.Id}.{KnownTypes.GetExtension(handle.File.Type)}");
        
        File.Copy(handle.TempFileName, dest);
    }
}

public class UploadHandle
{
    public Guid Id { get; set; }
    public AppFile File { get; set; }
    public string TempFileName { get; set; }
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