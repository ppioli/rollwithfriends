using Server.Graphql.Mutations;
using Server.Graphql.Mutations.MessageMutation;

namespace Server.EFModels.Messages.Roll;

public record Roll(
    int Faces,
    int Count,
    List<int>? Result)
{
    public static Roll Create(RollInfo roll)
    {
        var random = new Random();
        return new Roll(
            roll.Faces,
            roll.Count,
            Enumerable.Range(0, roll.Count)
                .Select(s => random.Next(1, roll.Faces + 1))
                .ToList());
    }
}