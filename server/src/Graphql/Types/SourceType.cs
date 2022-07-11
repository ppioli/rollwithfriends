using HotChocolate.Language;

namespace Server.Graphql.Types;

[Node]
[ExtendObjectType(typeof(Source))]
public class SourceType
{
    [NodeResolver]
    public static async Task<Source> Get([ID()] Guid id)
    {
        return null;
    }
}