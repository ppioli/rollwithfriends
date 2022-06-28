using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Server.EFModels;
using server.Infraestructure;

namespace Server.Services;

public class EnrollmentService
{
    private readonly RwfDbContext _db;
    private readonly IMemoryCache _cache;

    private string CampaingEntryKey(int camapaignId) => $"{nameof(Campaign)}_{camapaignId}"; 
    private string SceneEntryKey(int sceneId) => $"{nameof(Scene)}_{sceneId}"; 
    
    
    public EnrollmentService(RwfDbContext db, IMemoryCache cache)
    {
        _db = db;
        _cache = cache;
    }

    public CampaignRoll? GetRollInCampaign(ClaimsPrincipal user, int campaignId)
    {
        return GetRollInCampaign(user.GetId(), campaignId);
    }
    
    public CampaignRoll? GetRollInCampaign(string userId, int campaignId)
    {
        return GetEntry(campaignId).GetRol(userId);
    }
    
    public CampaignRoll? GetRollInScene(ClaimsPrincipal user, int sceneId)
    {
        return GetRollInScene(user.GetId(), sceneId);
    }
    
    public CampaignRoll? GetRollInScene(string userId, int sceneId)
    {
        return GetEntryFromScene(sceneId).GetRol(userId);
    }

    private CampaignCacheEntry GetEntry( int campaignId )
    {
        var key = CampaingEntryKey(campaignId);
        
        if (!_cache.TryGetValue(key, out CampaignCacheEntry entry))
        {
            // TODO redo
            // var campaign = _db.Campaigns.Include( c => c.Participants)
            //     .FirstOrDefault( c => c.Id == campaignId) ?? throw new NotAuthorizedException();

            // entry = new CampaignCacheEntry(campaign.DungeonMasterId, campaign.Participants);

            // Save data in cache and set the relative expiration time to one day
            _cache.Set(key, entry, TimeSpan.FromMinutes(30));
        }

        return entry;
    }
    
    private CampaignCacheEntry GetEntryFromScene( int sceneId )
    {
        
        // var key = SceneEntryKey(sceneId);
        // if (!_cache.TryGetValue(key, out int campaignId))
        // {
        //     campaignId = _db.Scenes
        //         .FirstOrDefault( c => c.Id == sceneId)?.CampaignId ?? throw new NotAuthorizedException();
        //     
        //     // Save data in cache and set the relative expiration time to one day
        //     _cache.Set(key, campaignId, TimeSpan.FromMinutes(30));
        // }
        //
        // return GetEntry(campaignId);
        return null;
    }

    internal class CampaignCacheEntry
    {
        private Dictionary<string, CampaignRoll> Participants { get; set; }
        
        public CampaignCacheEntry( string dmId, ICollection<CampaignEnrollment> participants)
        {
            Participants = new Dictionary<string, CampaignRoll>();
            foreach (var participant in participants)
            {
                Participants[participant.UserId] = participant.UserId == dmId ? CampaignRoll.DungeonMaster : CampaignRoll.Player;
            }
        }

        public CampaignRoll? GetRol(string userId)
        {
            if (Participants.ContainsKey(userId))
            {
                return Participants[userId];
            }

            return null;
        }
    }
}
