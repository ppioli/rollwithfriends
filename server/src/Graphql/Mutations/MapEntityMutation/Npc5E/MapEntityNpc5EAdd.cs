using RollWithFriends.Models.Characters;

namespace Server.Graphql.Mutations.MapEntityMutation.Npc5E;

/// <summary>
/// Add many 5 edition NPCs
/// </summary>
public class MapEntitiesNpc5EAdd
{
    [ID]
    public int SceneId { get; set; }

    public MapEntityNpc5EAdd[] Entities { get; set; } = default!;
}

/// <summary>
/// A single NPC definition
/// </summary>
public class MapEntityNpc5EAdd
{
    /// <summary>
    /// The entry id on the bestiary
    /// </summary>
    [ID] public int NpcId { get; set; }
    
    /// <summary>
    /// The map entity id
    /// </summary>
    public string Name { get; set; } = null!;
    
    /// <summary>
    /// The entity position X on the map
    /// </summary>
    public int X { get; set; }
    
    /// <summary>
    /// The entity position Y on the map
    /// </summary>
    public int Y { get; set; }

    /// <summary>
    /// A name token name
    /// </summary>
    public int Ac { get; set; }
    
    /// <summary>
    /// A name token name
    /// </summary>
    public int MaxHp { get; set; }
    
    /// <summary>
    /// A name token name
    /// </summary>
    public Size5E Size { get; set; }
}