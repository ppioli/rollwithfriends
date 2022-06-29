using System.Runtime.Serialization;
using AspNetCore.Identity.Mongo.Mongo;
using MongoDB.Driver;

namespace server.Infraestructure.MongoHelper;

public static class MongoCollectionExtensions
{
    public static async Task<T> UpdateAndGet<T>(this IMongoCollection<T> collection, UpdateInput<T> input) where T : IDocument
    {
        var existing = await collection.FirstOrDefaultAsync(t => t.Id == input.Id) ??
                       throw new EntityNotFound(input.Id, nameof(T));

        input.Apply(existing);

        var result = await collection.ReplaceOneAsync(t => t.Id == input.Id, existing);

        if (result.ModifiedCount != 1)
        {
            throw new UpdateException(nameof(T), input.Id);
        }

        return existing;
    }
}

public class UpdateException : ApiException
{
    public UpdateException(string entityName, Guid id) : base(
        $"An error occured while updating the entity ${entityName}#{id}")
    {
    }
}