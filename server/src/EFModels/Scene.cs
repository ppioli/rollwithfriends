using Server.EFModels.Map;
using Server.Graphql.Resolvers;
using server.Infraestructure.MongoHelper;

namespace Server.EFModels;

public class Scene : IDocument
{
    [ID]
    public Guid Id { get; set; }
    
    [ID]
    public Guid CampaignId { get; set; }

    public bool Stored { get; set; } = false;

    public string Description { get; set; } = "";

    public string Name { get; set; } = null!;

    public ICollection<MapEntity> Entities { get; set; } = default!;

    protected Scene() {}

    public Scene(string name, Guid campaignId)
    {
        Name = name;
        CampaignId = campaignId;
    }
}