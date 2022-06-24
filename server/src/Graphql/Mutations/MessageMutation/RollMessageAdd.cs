using Newtonsoft.Json;
using Server.EFModels.Messages;
using Server.EFModels.Messages.Roll;

namespace Server.Graphql.Mutations.MessageMutation;

/// <summary>
/// Add many roll messages
/// </summary>
public class RollMessagesAdd : MessagesAdd<RollMessageAdd>
{
}

/// <summary>
/// A single roll message definition
/// </summary>
public class RollMessageAdd
{
    /// <summary>
    /// Map entity sending the message
    /// </summary>
    [ID] public int? SourceId { get; set; }

    /// <summary>
    /// If true, only the DM will see this roll
    /// </summary>
    public bool DmRoll { get; set; }
    
    /// <summary>
    /// If true, only the DM will see this roll
    /// </summary>
    public List<RollInfo> Rolls { get; set; } = null!;

    public void Apply(EFModels.Messages.Message source, int campaignId, string userId)
    {
        
        var rolls = Rolls.Select(Roll.Create)
            .ToList();

        var rollContent = new RollMessageContent(DmRoll, rolls);


        source.UserId = userId;
        source.SourceId = SourceId;
        source.CampaignId = campaignId;
        source.Content = JsonConvert.SerializeObject(rollContent);
        source.Type = MessageType.Roll;
        source.CreatedAt = DateTime.UtcNow;
    }
}

/// <summary>
/// A die roll definition
/// </summary>
public class RollInfo
{
    /// <summary>
    /// The amount of faces on the dice ( for example, 20 for a d20 )
    /// </summary>
    public int Faces { get; set; }
    /// <summary>
    /// The count of dices to roll
    /// </summary>
    public int Count { get; set; }
}



