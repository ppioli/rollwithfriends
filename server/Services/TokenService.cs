using AutoMapper;
using server.Models.Map;

namespace server.Services;


public interface ITokenService
{
    public ICollection<Token> GetAll();
    public Token? GetById(int id);
    public Task<Token> Update(int id, TokenInput input);
    public Task<Token> Add( TokenInput input );
    public Task Delete(int id);
}
public class TokenService : ITokenService
{
    private readonly ICollection<Token> _tokens;
    private readonly IMapper _mapper;
    
    private readonly List<Token> _testTokens =
        new()
        {
            new Token()
            {
                Id = 1,
                X = 500,
                Y = 500,
                Width = 30,
                Height = 30,
            },
            new Token()
            {
                Id = 2,
                X = 250,
                Y = 250,
                Width = 50,
                Height = 50,
            },
            new Token()
            {
                Id = 3,
                X = 100,
                Y = 100,
                Width = 70,
                Height = 70,
            },
        };

    public TokenService(IMapper mapper)
    {
        _mapper = mapper;
        _tokens = new List<Token>(_testTokens);
    }

    public ICollection<Token> GetAll()
    {
        return _tokens;
    }

    public Token? GetById(int id)
    {
        return _tokens.FirstOrDefault(t => t.Id == id);
    }

    public Task<Token> Update(int id, TokenInput input)
    {
        var token = GetById(id)!;
        
        _mapper.Map(input, token);

        return Task.FromResult(token);
    }

    public Task<Token> Add(TokenInput input)
    {
        var newToken = _mapper.Map(input, new Token());
        newToken.Id = _tokens.Count + 1;
        _tokens.Add(newToken);
        return Task.FromResult(newToken);
    }

    public async Task Delete(int id)
    {
        _tokens.Remove(GetById(id)!);
    }
}