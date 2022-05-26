using AutoMapper;
using HotChocolate.Subscriptions;
using Server.Models;
using Server.Services;
using Server.Subscriptions;

namespace Server.Mutations;

public class TokenMutation
{
    private readonly ITokenService _tokenService;
    private readonly ITopicEventSender _sender;
    private readonly IMapper _mapper;
    
    public TokenMutation(ITokenService tokenService, IMapper mapper, ITopicEventSender sender)
    {
        _tokenService = tokenService;
        _mapper = mapper;
        _sender = sender;
    }

    [UseMutationConvention]
    public async Task<TokenPayload> UpdateToken([ID] int id, TokenInput token)
    {
        var updated = await _tokenService.Update(id, token);
        var model = _mapper.Map<TokenPayload>(updated);
        await _sender.SendAsync(nameof(TokenChangeEvent), TokenChangeEvent.Updated(model));
        
        return model;
    }
    
    
    [UseMutationConvention]
    public async Task<TokenPayload> AddToken(TokenInput token)
    {
        var added = await _tokenService.Add(token);
        
        var model = _mapper.Map<TokenPayload>(added);

        await _sender.SendAsync(nameof(TokenChangeEvent), TokenChangeEvent.Added(model));

        return model;
    }
    
    [UseMutationConvention]
    public async Task DeleteToken([ID]int id)
    {
        await _sender.SendAsync(nameof(TokenChangeEvent), TokenChangeEvent.Deleted(id));
        
        await _tokenService.Delete(id);
    }
}