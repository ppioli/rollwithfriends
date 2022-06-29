using System.Security.Claims;

namespace server.Infraestructure;

public static class UserExtensions
{
    public static Guid GetId(this ClaimsPrincipal principal)
    {
        return TryGetId(principal) ?? throw new Exception("The current user is not logged it");
    }
    
    public static Guid? TryGetId(this ClaimsPrincipal principal)
    {
        var userIdClaim = principal.FindFirst(c => c.Type == ClaimTypes.NameIdentifier) ?? principal.FindFirst(c => c.Type == "sub");
        if (userIdClaim != null && !string.IsNullOrEmpty(userIdClaim.Value))
        {
            return new Guid(userIdClaim.Value);
        }

        return null;
    }
}