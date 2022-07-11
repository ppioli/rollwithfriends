using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using Newtonsoft.Json;
using Server.EFModels.Messages;
using Server.Graphql.Resolvers;
using server.Infraestructure;

namespace Server.EFModels;

public class Campaign
{
    [ID]
    public Guid Id { get; set; }

    public string Name { get; set; }
    public string Description { get; set; }
    
    [ID]
    public Guid? SelectedSceneId { get; set; }

    public ICollection<CampaignEnrollment> Participants { get; set; } = new List<CampaignEnrollment>();

    protected Campaign()
    {
    }

    public static Campaign Craete(string name, string description)
    {
        return new Campaign()
        {
            Name = name,
            Description = description
        };
    }
}