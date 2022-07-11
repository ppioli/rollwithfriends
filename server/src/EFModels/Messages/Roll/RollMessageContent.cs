using Elasticsearch.Net.Specification.RollupApi;

namespace Server.EFModels.Messages.Roll;

public class RollMessageContent : MessageContent
{
    public bool DmRoll { get; set; }
    public List<Roll> Rolls { get; set; } = null!;

    protected RollMessageContent()
    {
        
    }

    public static RollMessageContent Create(List<Roll> rolls, bool dmRoll)
    {
        return new RollMessageContent()
        {
            Rolls = rolls,
            DmRoll = dmRoll
        };
    }
}