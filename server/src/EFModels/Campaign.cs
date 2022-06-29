using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using Newtonsoft.Json;
using Server.EFModels.Messages;
using Server.Graphql.Resolvers;
using server.Infraestructure;

namespace Server.EFModels;

[Node( NodeResolverType = typeof(CampaignResolver), NodeResolver = nameof(CampaignResolver.Get))]
public class Campaign
{
    [ID]
    public Guid Id { get; set; }

    public string Name { get; set; }
    public string Description { get; set; }
    
    [ID]
    public Guid DungeonMasterId { get; set; }
    
    [ID]
    public Guid? SelectedSceneId { get; set; }

    public ICollection<CampaignEnrollment> Participants { get; set; } = new List<CampaignEnrollment>();

    public Campaign(string name, string description, Guid dungeonMasterId)
    {
        Name = name;
        Description = description;
        DungeonMasterId = dungeonMasterId;
    }

    protected Campaign()
    {
    }

}