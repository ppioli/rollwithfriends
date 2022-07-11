using System.Linq.Expressions;
using MongoDB.Driver;

namespace Server.Infraestructure;

public static class IMongoCollectionExtension
{
    public static async Task<TEntitiy?> FindOneAsync<TEntitiy>(this IMongoCollection<TEntitiy> collection, Expression<Func<TEntitiy, bool>> expression)
    {
        var result = await collection.FindAsync(expression);

        return result.FirstOrDefault();
    }
}