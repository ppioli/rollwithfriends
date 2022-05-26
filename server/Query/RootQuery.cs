using AutoMapper;
using server.Models.Map;
using server.Services;

namespace server.Query;

public class RootQuery
{
    [UseFiltering()]
    public ICollection<Token> Tokens([Service] ITokenService tokenService) => tokenService.GetAll();
}