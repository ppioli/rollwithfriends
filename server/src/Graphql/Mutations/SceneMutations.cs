using System.Security.Claims;
using AutoMapper;
using HotChocolate.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Server.EFModels;
using server.Infraestructure;

namespace Server.Graphql.Mutations;

[ExtendObjectType("Mutation")]
public class SceneMutations
{
    
    [Authorize]
    public async Task<Scene> SceneAdd(
        RwfDbContext context,
        [ID] int campaignId,
        string name)
    {

        // var scene = new Scene(name)
        // {
        //     CampaignId = campaignId
        // };
        //
        // await context.AddAsync(scene);
        //
        // await context.SaveChangesAsync();
        //
        // return scene;
        return null;
    }
    
    [Authorize]
    public async Task<Scene> SceneAddDelete(
        RwfDbContext context,
        [ID] int sceneId)
    {

        // var value = await context.Scenes.FindAsync(sceneId) ?? throw new EntityNotFound(sceneId);
        //
        // context.Remove(value);
        //
        // await context.SaveChangesAsync();
        //
        // return value;
        return null;
    }
    
    [Authorize]
    public async Task<Scene> SceneAddUpdate(
        RwfDbContext context,
        [ID] int sceneId,
        string name)
    {

        // var value = await context.Scenes.FindAsync(sceneId) ?? throw new EntityNotFound(sceneId);
        //
        // value.Name = name; 
        //
        // await context.SaveChangesAsync();
        //
        // return value;
        return null;
    }
}