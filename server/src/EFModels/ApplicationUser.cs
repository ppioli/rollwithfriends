
using AspNetCore.Identity.Mongo.Model;
using MongoDB.Bson;

namespace Server.EFModels;

public class ApplicationUser : MongoUser<Guid>
{
    public string? FirstName { get; set; }
    public string? SurName { get; set; }
    public string? ProfilePicture { get; set; }
}

public class ApplicationRole : MongoRole<Guid>
{
    public ApplicationRole(string name) : base(name)
    {
    }
}