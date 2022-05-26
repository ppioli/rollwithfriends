using Server.Models;
using Server.Services;

namespace Server.Query;

public class RootQuery
{
    [UseFiltering()]
    public ICollection<Token> Tokens([Service] ITokenService tokenService) => tokenService.GetAll();
}