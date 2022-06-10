using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using server.Infraestructure;
using Server.Services;
namespace server.Controllers;

[ApiController]
[Authorize]
public class UploadController : Controller
{
    private readonly FileStorageService _fileStorageService;
    private readonly RwfDbContext _db;

    public UploadController(FileStorageService fileStorageService, RwfDbContext db)
    {
        _fileStorageService = fileStorageService;
        _db = db;
    }

    [HttpPost]
    [Authorize]
    [Route("Upload")]
    public async Task<IActionResult> Upload(FileUploadRequest request)
    {
        var fileIds = request.Files.Select(s => s.FileId).ToArray();

        var files = _db.Files.Where(f => fileIds.Contains(f.Id))
            .ToList();

        if (files.Any(f => f.OwnerId != HttpContext.User.GetId()))
        {
            throw new ClientException("You don't have permission to modify these files");
        }

        var handles = _fileStorageService.StartUpload(files);

        foreach (var handle in handles)
        {
            
            var buffer = new byte[16 * 1024];
            var source = request.Files.First(f => f.FileId == handle.File.Id).File;
            var totalBytes = source.Length;

            await using FileStream output = System.IO.File.Create(handle.TempFileName);
            await using Stream input = source.OpenReadStream();

            long totalReadBytes = 0;
            int readBytes;
            while ((readBytes = await input.ReadAsync(buffer)) > 0)
            {
                await output.WriteAsync(buffer, 0, readBytes);
                totalReadBytes += readBytes;
                _fileStorageService.SetProgress(handle.Id, (int)(totalReadBytes / (float)totalBytes * 100.0));
                await Task.Delay(10); // It is only to make the process slower
            }

            _fileStorageService.Complete(handle.Id);
        }

        return Content("Success");
    }
    //
    // [HttpPost]
    // public ActionResult Progress()
    // {
    //     return this.Content(Startup.Progress.ToString());
    // }
    //
    // private string EnsureCorrectFilename(string filename)
    // {
    //     if (filename.Contains("\\"))
    //         filename = filename.Substring(filename.LastIndexOf("\\") + 1);
    //
    //     return filename;
    // }
    //
    // private string GetPathAndFilename(string filename)
    // {
    //     string path = this.hostingEnvironment.WebRootPath + "\\uploads\\";
    //
    //     if (!Directory.Exists(path))
    //         Directory.CreateDirectory(path);
    //
    //     return path + filename;
    // }
    // [HttpPost]
    // [ValidateAntiForgeryToken]
    // public async Task<IActionResult> UploadDatabase()
    // {
    //     if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
    //     {
    //         ModelState.AddModelError(
    //             "File",
    //             $"The request couldn't be processed (Error 1).");
    //         // Log error
    //
    //         return BadRequest(ModelState);
    //     }
    //
    //     // Accumulate the form data key-value pairs in the request (formAccumulator).
    //     var formAccumulator = new KeyValueAccumulator();
    //     var trustedFileNameForDisplay = string.Empty;
    //     var untrustedFileNameForStorage = string.Empty;
    //     var streamedFileContent = Array.Empty<byte>();
    //
    //     var boundary = MultipartRequestHelper.GetBoundary(
    //         MediaTypeHeaderValue.Parse(Request.ContentType),
    //         _defaultFormOptions.MultipartBoundaryLengthLimit);
    //     var reader = new MultipartReader(boundary, HttpContext.Request.Body);
    //
    //     var section = await reader.ReadNextSectionAsync();
    //
    //     while (section != null)
    //     {
    //         var hasContentDispositionHeader =
    //             ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out var contentDisposition);
    //
    //         if (hasContentDispositionHeader)
    //         {
    //             if (MultipartRequestHelper
    //                 .HasFileContentDisposition(contentDisposition))
    //             {
    //                 untrustedFileNameForStorage = contentDisposition.FileName.Value;
    //                 // Don't trust the file name sent by the client. To display
    //                 // the file name, HTML-encode the value.
    //                 trustedFileNameForDisplay = WebUtility.HtmlEncode(contentDisposition.FileName.Value);
    //
    //                 streamedFileContent =
    //                     await FileHelpers.ProcessStreamedFile(
    //                         section,
    //                         contentDisposition,
    //                         ModelState,
    //                         _permittedExtensions,
    //                         _fileSizeLimit);
    //
    //                 if (!ModelState.IsValid)
    //                 {
    //                     return BadRequest(ModelState);
    //                 }
    //             }
    //             else if (MultipartRequestHelper
    //                      .HasFormDataContentDisposition(contentDisposition))
    //             {
    //                 // Don't limit the key name length because the 
    //                 // multipart headers length limit is already in effect.
    //                 var key = HeaderUtilities
    //                     .RemoveQuotes(contentDisposition.Name)
    //                     .Value;
    //                 var encoding = GetEncoding(section);
    //
    //                 if (encoding == null)
    //                 {
    //                     ModelState.AddModelError(
    //                         "File",
    //                         $"The request couldn't be processed (Error 2).");
    //                     // Log error
    //
    //                     return BadRequest(ModelState);
    //                 }
    //
    //                 using (var streamReader = new StreamReader(
    //                            section.Body,
    //                            encoding,
    //                            detectEncodingFromByteOrderMarks: true,
    //                            bufferSize: 1024,
    //                            leaveOpen: true))
    //                 {
    //                     // The value length limit is enforced by 
    //                     // MultipartBodyLengthLimit
    //                     var value = await streamReader.ReadToEndAsync();
    //
    //                     if (string.Equals(
    //                             value,
    //                             "undefined",
    //                             StringComparison.OrdinalIgnoreCase))
    //                     {
    //                         value = string.Empty;
    //                     }
    //
    //                     formAccumulator.Append(key, value);
    //
    //                     if (formAccumulator.ValueCount >
    //                         _defaultFormOptions.ValueCountLimit)
    //                     {
    //                         // Form key count limit of 
    //                         // _defaultFormOptions.ValueCountLimit 
    //                         // is exceeded.
    //                         ModelState.AddModelError(
    //                             "File",
    //                             $"The request couldn't be processed (Error 3).");
    //                         // Log error
    //
    //                         return BadRequest(ModelState);
    //                     }
    //                 }
    //             }
    //         }
    //
    //         // Drain any remaining section body that hasn't been consumed and
    //         // read the headers for the next section.
    //         section = await reader.ReadNextSectionAsync();
    //     }
    //
    //     // Bind form data to the model
    //     var formData = new FormData();
    //     var formValueProvider = new FormValueProvider(
    //         BindingSource.Form,
    //         new FormCollection(formAccumulator.GetResults()),
    //         CultureInfo.CurrentCulture);
    //     var bindingSuccessful = await TryUpdateModelAsync(
    //         formData,
    //         prefix: "",
    //         valueProvider: formValueProvider);
    //
    //     if (!bindingSuccessful)
    //     {
    //         ModelState.AddModelError(
    //             "File",
    //             "The request couldn't be processed (Error 5).");
    //         // Log error
    //
    //         return BadRequest(ModelState);
    //     }
    //
    //     // **WARNING!**
    //     // In the following example, the file is saved without
    //     // scanning the file's contents. In most production
    //     // scenarios, an anti-virus/anti-malware scanner API
    //     // is used on the file before making the file available
    //     // for download or for use by other systems. 
    //     // For more information, see the topic that accompanies 
    //     // this sample app.
    //
    //     var file = new AppFile()
    //     {
    //         Content = streamedFileContent,
    //         UntrustedName = untrustedFileNameForStorage,
    //         Note = formData.Note,
    //         Size = streamedFileContent.Length,
    //         UploadDT = DateTime.UtcNow
    //     };
    //
    //     _context.File.Add(file);
    //     await _context.SaveChangesAsync();
    //
    //     return Created(nameof(StreamingController), null);
    // }
    //
    // [HttpPost]
    // [ValidateAntiForgeryToken]
    // public async Task<IActionResult> UploadPhysical()
    // {
    //     Debug.Assert(Request.ContentType != null, "Request.ContentType != null");
    //     
    //     if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
    //     {
    //         ModelState.AddModelError(
    //             "File",
    //             $"The request couldn't be processed (Error 1).");
    //         // Log error
    //
    //         return BadRequest(ModelState);
    //     }
    //
    //     var boundary = MultipartRequestHelper.GetBoundary(
    //         MediaTypeHeaderValue.Parse(Request.ContentType),
    //         _defaultFormOptions.MultipartBoundaryLengthLimit);
    //     var reader = new MultipartReader(boundary, HttpContext.Request.Body);
    //     var section = await reader.ReadNextSectionAsync();
    //
    //     while (section != null)
    //     {
    //         var hasContentDispositionHeader =
    //             ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out var contentDisposition);
    //
    //         if (hasContentDispositionHeader)
    //         {
    //             // This check assumes that there's a file
    //             // present without form data. If form data
    //             // is present, this method immediately fails
    //             // and returns the model error.
    //             if (!MultipartRequestHelper
    //                     .HasFileContentDisposition(contentDisposition))
    //             {
    //                 ModelState.AddModelError(
    //                     "File",
    //                     $"The request couldn't be processed (Error 2).");
    //                 // Log error
    //
    //                 return BadRequest(ModelState);
    //             }
    //             else
    //             {
    //                 // Don't trust the file name sent by the client. To display
    //                 // the file name, HTML-encode the value.
    //                 var trustedFileNameForDisplay = WebUtility.HtmlEncode(contentDisposition.FileName.Value);
    //                 var trustedFileNameForFileStorage = Path.GetRandomFileName();
    //
    //                 // **WARNING!**
    //                 // In the following example, the file is saved without
    //                 // scanning the file's contents. In most production
    //                 // scenarios, an anti-virus/anti-malware scanner API
    //                 // is used on the file before making the file available
    //                 // for download or for use by other systems. 
    //                 // For more information, see the topic that accompanies 
    //                 // this sample.
    //
    //                 var streamedFileContent = await FileHelpers.ProcessStreamedFile(
    //                     section,
    //                     contentDisposition,
    //                     ModelState,
    //                     _permittedExtensions,
    //                     _fileSizeLimit);
    //
    //                 if (!ModelState.IsValid)
    //                 {
    //                     return BadRequest(ModelState);
    //                 }
    //
    //                 using (var targetStream = System.IO.File.Create(
    //                            Path.Combine(_targetFilePath, trustedFileNameForFileStorage)))
    //                 {
    //                     await targetStream.WriteAsync(streamedFileContent);
    //
    //                     _logger.LogInformation(
    //                         "Uploaded file '{TrustedFileNameForDisplay}' saved to " +
    //                         "'{TargetFilePath}' as {TrustedFileNameForFileStorage}",
    //                         trustedFileNameForDisplay,
    //                         _targetFilePath,
    //                         trustedFileNameForFileStorage);
    //                 }
    //             }
    //         }
    //
    //         // Drain any remaining section body that hasn't been consumed and
    //         // read the headers for the next section.
    //         section = await reader.ReadNextSectionAsync();
    //     }
    //
    //     return Created(nameof(StreamingController), null);
    // }
}

public class FileUploadRequest
{
    public FileUpload[] Files { get; init; } = null!;
}

public class FileUpload
{
    public int FileId { get; init; }
    public IFormFile File { get; init; } = null!;
}

public static class MultipartRequestHelper
{
    // Content-Type: multipart/form-data; boundary="----WebKitFormBoundarymx2fSWqWSd0OxQqq"
    // The spec at https://tools.ietf.org/html/rfc2046#section-5.1 states that 70 characters is a reasonable limit.
    public static string GetBoundary(MediaTypeHeaderValue contentType, int lengthLimit)
    {
        var boundary = HeaderUtilities.RemoveQuotes(contentType.Boundary).Value;

        if (string.IsNullOrWhiteSpace(boundary))
        {
            throw new InvalidDataException("Missing content-type boundary.");
        }

        if (boundary.Length > lengthLimit)
        {
            throw new InvalidDataException($"Multipart boundary length limit {lengthLimit} exceeded.");
        }

        return boundary;
    }

    public static bool IsMultipartContentType(string contentType)
    {
        return !string.IsNullOrEmpty(contentType) &&
               contentType.IndexOf("multipart/", StringComparison.OrdinalIgnoreCase) >= 0;
    }

    public static bool HasFormDataContentDisposition(ContentDispositionHeaderValue? contentDisposition)
    {
        // Content-Disposition: form-data; name="key";
        return contentDisposition != null &&
               contentDisposition.DispositionType.Equals("form-data") &&
               string.IsNullOrEmpty(contentDisposition.FileName.Value) &&
               string.IsNullOrEmpty(contentDisposition.FileNameStar.Value);
    }

    public static bool HasFileContentDisposition(ContentDispositionHeaderValue? contentDisposition)
    {
        // Content-Disposition: form-data; name="myfile1"; filename="Misc 002.jpg"
        return contentDisposition != null &&
               contentDisposition.DispositionType.Equals("form-data") &&
               (!string.IsNullOrEmpty(contentDisposition.FileName.Value) ||
                !string.IsNullOrEmpty(contentDisposition.FileNameStar.Value));
    }
}