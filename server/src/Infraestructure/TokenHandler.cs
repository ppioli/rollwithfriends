using System.Diagnostics;
using Microsoft.AspNetCore;
using Microsoft.Net.Http.Headers;
using OpenIddict.Server;
using OpenIddict.Server.AspNetCore;
using ILogger = Castle.Core.Logging.ILogger;

namespace server.Infraestructure;

/// <summary>
/// Contains the logic responsible for extracting an access token from the standard HTTP Authorization header.
/// Note: this handler is not used when the OpenID Connect request is not initially handled by ASP.NET Core.
/// </summary>
public class OidcExtractTokenHandler : IOpenIddictServerHandler<OpenIddictServerEvents.ProcessRequestContext>
{
    private readonly ILogger<OidcExtractTokenHandler> _logger;

    public OidcExtractTokenHandler(ILogger<OidcExtractTokenHandler> logger)
    {
        _logger = logger;
    }

    public ValueTask HandleAsync(OpenIddictServerEvents.ProcessRequestContext context)
    {
        if (context is null)
        {
            throw new ArgumentNullException(nameof(context));
        }

        // This handler only applies to ASP.NET Core requests. If the HTTP context cannot be resolved,
        // this may indicate that the request was incorrectly processed by another server stack.
        var request = context.Transaction.GetHttpRequest()!;

        _logger.LogInformation("Protocol {Protocol}", request.Protocol);
        if (request.Protocol == "ws")
        {
            throw new Exception("ws");
        }

        // Debug.Assert(context.Transaction.Request is not null,  "I dont know man...");
        //
        // string header = request.Headers[HeaderNames.Authorization];
        // if (string.IsNullOrEmpty(header) || !header.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
        // {
        //     return default;
        // }
        //
        // // Attach the access token to the request message.
        // context.Transaction.Request.AccessToken = header.Substring("Bearer ".Length);

        return default;
    }
}