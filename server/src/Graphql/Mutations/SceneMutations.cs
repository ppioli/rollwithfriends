using System.Security.Claims;
using AspNetCore.Identity.Mongo.Mongo;
using AutoMapper;
using HotChocolate.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using Server.EFModels;
using server.Infraestructure;
using server.Infraestructure.MongoHelper;

namespace Server.Graphql.Mutations;

[ExtendObjectType("Mutation")]
public class SceneMutations
{
    [Authorize]
    public async Task<Scene> SceneAdd(
        [Service()] RwfDbContext context,
        [ID] Guid campaignId,
        string name)
    {
        var scene = Scene.Create(name, campaignId);

        await context.Scenes.InsertOneAsync(scene);

        return scene;
    }

    [Authorize]
    public async Task<Guid> SceneDelete(
        [Service()] RwfDbContext context,
        [ID] Guid sceneId)
    {
        var result = (await context.Scenes.DeleteOneAsync(s => s.Id == sceneId));

        return sceneId;
    }

    [Authorize]
    public async Task<Scene> SceneUpdate(
        [Service()] RwfDbContext context,
        SceneUpdate input)
    {
        return await context.Scenes.UpdateAndGet(input);
    }
}

public class SceneUpdate : UpdateInput<Scene>
{
    public Guid SceneId { get; set; }
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    
    [GraphQLIgnore]
    public Guid Id => SceneId;

    
    public void Apply(Scene value)
    {
        value.Name = Name;
        value.Description = Description;
    }
}