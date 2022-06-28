
using AspNetCore.Identity.Mongo.Model;

namespace Server.EFModels;

using Microsoft.AspNetCore.Identity;

public class User : MongoUser
{
    public string? FirstName { get; set; }
    public string? SurName { get; set; }
    public string? ProfilePicture { get; set; }
}