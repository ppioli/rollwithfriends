using AutoMapper;
using Server.Services;

namespace Server.Models;

/// <summary>
/// Represents something on the table
/// </summary>
[Node]
public class Token
{
    public int Id { get; set; }
    public int X { get; set; }
    public int Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    
    public static Token Get(int id,
        [Service] ITokenService service)
    {
        // TODO
        return service.GetById(id)!;
    }
}

public class TokenBase
{
    public int X { get; set; }
    public int Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
}

public class TokenInput : TokenBase
{
}

public class TokenPayload : TokenBase
{
    public int Id { get; set; }
}

public class TokenProfile : Profile
{
    public TokenProfile()
    {
        CreateMap<Token, TokenBase>(MemberList.Destination);
        CreateMap<TokenBase, Token>(MemberList.Source);
        
        CreateMap<Token, TokenPayload>(MemberList.Destination)
            .IncludeBase<Token, TokenBase>();
        
        CreateMap<TokenInput, Token>(MemberList.Source)
            .IncludeBase<TokenBase, Token>();
    }
}