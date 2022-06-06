using System.Security.Claims;
using server.Infraestructure;

namespace Server.EFModels;

public class Campaign
{
    [ID]
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

    public virtual ICollection<CampaignEnrollment> Participants { get; set; } = new List<CampaignEnrollment>();

    public Campaign(string name, string description, string dungeonMasterId)
    {
        Name = name;
        Description = description;
        DungeonMasterId = dungeonMasterId;
    }

    protected Campaign()
    {
    }

    public static Campaign Get(int id)
    {
        throw new NotImplementedException();
    }

    public bool IsDungeonMaster(ClaimsPrincipal user)
    {
        return user.GetId() == DungeonMasterId;
    }

    [GraphQLName("selectedScene")]
    [UseFirstOrDefault()]
    [UseProjection()]
    public IQueryable<Scene> GetSelectedScene(
        RwfDbContext context,
        [ID] int? sceneId,
        ClaimsPrincipal user)
    {
        var isDm = IsDungeonMaster(user);
        var dmSceneId = sceneId ?? SelectedSceneId;

        return context.Scenes.Where(s => (isDm && (s.Id == dmSceneId)) || (!isDm && (sceneId) == SelectedSceneId));

    }
}