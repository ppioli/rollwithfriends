using System.Net.WebSockets;
using System.Security.Claims;
using HotChocolate.AspNetCore;
using HotChocolate.AspNetCore.Subscriptions;
using HotChocolate.AspNetCore.Subscriptions.Protocols;
using HotChocolate.AspNetCore.Subscriptions.Protocols.Apollo;
using HotChocolate.Execution;
using Microsoft.AspNetCore.Authentication;
using OpenIddict.Validation;
using OpenIddict.Validation.AspNetCore;

namespace Server.Graphql;

public class SocketSessionInterceptor : DefaultSocketSessionInterceptor
{
    private readonly ILogger<SocketSessionInterceptor> _logger;
    private readonly OpenIddictValidationService _validationService;
    public SocketSessionInterceptor(
        ILogger<SocketSessionInterceptor> logger,
        OpenIddictValidationService validationService)
    {
        _logger = logger;
        _validationService = validationService;
    }
    
    public override async ValueTask<ConnectionStatus> OnConnectAsync(
        ISocketSession session,
        IOperationMessagePayload connectionInitMessage,
        CancellationToken cancellationToken = default)


    {
        var payload = connectionInitMessage.As<InitMessagePayload>();

        HttpContext context = session.Connection.HttpContext;

        context.Request.Headers["Authorization"] = $"{payload!.access_token}";

        return await base.OnConnectAsync(session, connectionInitMessage, cancellationToken);
    }

    public override async ValueTask OnRequestAsync(
        ISocketSession session,
        string operationSessionId,
        IQueryRequestBuilder requestBuilder,
        CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("On Request");

        var token = session.Connection.HttpContext.Request.Headers["Authorization"];
        var claims = await _validationService.ValidateAccessTokenAsync(token, cancellationToken);

        session.Connection.HttpContext.User = claims;

        await base.OnRequestAsync(session, operationSessionId, requestBuilder, cancellationToken);
    }

    internal class InitMessagePayload
    {
        public string access_token { get; set; }
    }
}

// public class AuthenticationSocketInterceptor : ISocketConnectionInterceptor<HttpContext>
//     {
//         // This is the key to the auth token in the HTTP Context
//         public static readonly string HTTP_CONTEXT_WEBSOCKET_AUTH_KEY = "websocket-auth-token";
//         // This is the key that apollo uses in the connection init request
//         public static readonly string WEBOCKET_PAYLOAD_AUTH_KEY = "Authorization";
//
//         private readonly IAuthenticationSchemeProvider _schemes;
//         public AuthenticationSocketInterceptor(IAuthenticationSchemeProvider schemes)
//         {
//             _schemes = schemes;
//         }
//         public async Task<ConnectionStatus> OnOpenAsync(
//             HttpContext context,
//             IReadOnlyDictionary<string, object> properties,
//             CancellationToken cancellationToken)
//         {
//             if (properties.TryGetValue(WEBOCKET_PAYLOAD_AUTH_KEY, out object token) &&
//                 token is string stringToken)
//             {
//                 context.Items[HTTP_CONTEXT_WEBSOCKET_AUTH_KEY] = stringToken;
//                 context.Features.Set<IAuthenticationFeature>(new AuthenticationFeature
//                 {
//                     OriginalPath = context.Request.Path,
//                     OriginalPathBase = context.Request.PathBase
//                 });
//                 // Give any IAuthenticationRequestHandler schemes a chance to handle the request
//                 var handlers = context.RequestServices.GetRequiredService<IAuthenticationHandlerProvider>();
//                 foreach (var scheme in await _schemes.GetRequestHandlerSchemesAsync())
//                 {
//                     var handler = handlers.GetHandlerAsync(context, scheme.Name) as IAuthenticationRequestHandler;
//                     if (handler != null && await handler.HandleRequestAsync())
//                     {
//                         return ConnectionStatus.Reject();
//                     }
//                 }
//                 var defaultAuthenticate = await _schemes.GetDefaultAuthenticateSchemeAsync();
//                 if (defaultAuthenticate != null)
//                 {
//                     var result = await context.AuthenticateAsync(defaultAuthenticate.Name);
//                     if (result?.Principal != null)
//                     {
//                         var webSocketContext = context.RequestServices.GetService<WebSocketContext>();
//                         webSocketContext.User = result.Principal;
//                         context.User = result.Principal;
//                         return ConnectionStatus.Accept();
//                     }
//                 }
//             }
//             return ConnectionStatus.Reject();
//         }
//     }
// } 