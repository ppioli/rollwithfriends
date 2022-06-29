using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using MongoDB.Driver;
using Server.EFModels;
using server.Infraestructure;

namespace Server.Services;

public class EnrollmentService
{
    private readonly RwfDbContext _db;
    private readonly IMemoryCache _cache;

    public EnrollmentService(RwfDbContext db, IMemoryCache cache)
    {
        _db = db;
        _cache = cache;
    }

    public CampaignRoll? GetRollInCampaign(ClaimsPrincipal user, Guid campaignId)
    {
        return GetRollInCampaign(user.GetId(), campaignId);
    }
    
    public CampaignRoll? GetRollInCampaign(Guid userId, Guid campaignId)
    {
        return GetEntry(campaignId).GetRol(userId);
    }
    
    public CampaignRoll? GetRollInScene(ClaimsPrincipal user, Guid sceneId)
    {
        return GetRollInScene(user.GetId(), sceneId);
    }
    
    public CampaignRoll? GetRollInScene(Guid userId, Guid sceneId)
    {
        return GetEntryFromScene(sceneId).GetRol(userId);
    }

    private CampaignCacheEntry GetEntry( Guid campaignId )
    {
        
        if (!_cache.TryGetValue(campaignId, out CampaignCacheEntry entry))
        {
            // TODO redo
            var campaign = _db.Campaigns.AsQueryable()
                .FirstOrDefault( c => c.Id == campaignId) ?? throw new NotAuthorizedException(nameof(Campaign));

            entry = new CampaignCacheEntry(campaign.DungeonMasterId, campaign.Participants);

            // Save data in cache and set the relative expiration time to one day
            _cache.Set(campaignId, entry, TimeSpan.FromMinutes(30));
        }

        return entry;
    }
    
    private CampaignCacheEntry GetEntryFromScene( Guid sceneId )
    {
        
        
        if (!_cache.TryGetValue(sceneId, out Guid campaignId))
        {
            campaignId = _db.Scenes
                .Find( c => c.Id == sceneId)
                .FirstOrDefault()?.CampaignId ?? throw new NotAuthorizedException(nameof(Scene));
            
            // Save data in cache and set the relative expiration time to one day
            _cache.Set(sceneId, campaignId, TimeSpan.FromMinutes(30));
        }
        
        return GetEntry(campaignId);
    }

    internal class CampaignCacheEntry
    {
        private Dictionary<Guid, CampaignRoll> Participants { get; set; }
        
        public CampaignCacheEntry( Guid dmId, ICollection<CampaignEnrollment> participants)
        {
            Participants = new Dictionary<Guid, CampaignRoll>();
            foreach (var participant in participants)
            {
                Participants[participant.UserId] = participant.UserId == dmId ? CampaignRoll.DungeonMaster : CampaignRoll.Player;
            }
        }

        public CampaignRoll? GetRol(Guid userId)
        {
            if (Participants.ContainsKey(userId))
            {
                return Participants[userId];
            }

            return null;
        }
    }
}
