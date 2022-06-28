using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using Newtonsoft.Json;
using Server.EFModels.Messages;
using server.Infraestructure;

namespace Server.EFModels;

[Node]
public class Campaign
{
    [ID]
    [IsProjected(true)]
    public int Id { get; set; }

    public string Name { get; set; }
    public string Description { get; set; }

    [GraphQLIgnore]
    public virtual User DungeonMaster { get; set; } = default!;

    [IsProjected(true)]
    public string DungeonMasterId { get; set; }

    public virtual ICollection<Scene> Scenes { get; set; } = new List<Scene>();

    [GraphQLIgnore]
    public virtual Scene? SelectedScene { get; set; }

    [IsProjected(true)]
    public int? SelectedSceneId { get; set; }


    [GraphQLIgnore]
    public virtual ICollection<Message> Messages { get; set; } = default!;

    // TODO This used to work as a projection
    // [UsePaging(IncludeTotalCount = true)]
    // public IQueryable<Message> GetMessages(RwfDbContext context) => context.Messages
    //     .Where(m => m.CampaignId == Id)
    //     .OrderBy(s => s.CreatedAt);

    [GraphQLIgnore]
    public virtual ICollection<CampaignEnrollment> Participants { get; set; } = new List<CampaignEnrollment>();

    // public ICollection<Participant> GetParticipants([Service()] RwfDbContext db) => (db.Campaigns
    //             .Include(c => c.Participants)
    //             .ThenInclude(p => p.User)
    //             .FirstOrDefault(c => c.Id == Id) ??
    //         throw new Exception($"Could not find participants for campaign #{Id}"))
    //     .Participants.Select(
    //         p => new Participant(
    //             p.Id,
    //             p.UserId,
    //             p.User.UserName,
    //             p.UserId == DungeonMasterId ? CampaignRoll.DungeonMaster : CampaignRoll.Player))
    //     .ToList();

    public Campaign(string name, string description, string dungeonMasterId)
    {
        Name = name;
        Description = description;
        DungeonMasterId = dungeonMasterId;
    }

    protected Campaign()
    {
    }


    public static Campaign Get(int id, RwfDbContext context)
    {
        throw new NotImplementedException();
    }

    public bool IsDungeonMaster(ClaimsPrincipal user)
    {
        return user.GetId() == DungeonMasterId;
    }

    [GraphQLName("selectedScene")]
    [UseFirstOrDefault()]
    public IQueryable<Scene> GetSelectedScene(
        RwfDbContext context,
        [ID] int? sceneId,
        ClaimsPrincipal user)
    {
        // TODO redo
        // var isDm = IsDungeonMaster(user);
        // var dmSceneId = sceneId ?? SelectedSceneId;
        //
        // return context.Scenes.Where(s => (isDm && (s.Id == dmSceneId)) || (!isDm && (sceneId) == SelectedSceneId));

        return null;
    }
}

[Node]
public class Participant
{
    [ID()]
    public int Id { get; set; }

    public string UserId { get; set; }
    public string Name { get; set; }
    public CampaignRoll CampaignRoll { get; set; }

    public Participant(int id, string userId, string name, CampaignRoll campaignRoll)
    {
        Id = id;
        UserId = userId;
        Name = name;
        CampaignRoll = campaignRoll;
    }

    public static Participant Get([ID] int id)
    {
        throw new NotImplementedException();
    }
}