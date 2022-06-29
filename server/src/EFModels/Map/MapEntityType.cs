using server.Infraestructure;

namespace Server.EFModels.Map;

public enum MapEntityType {
    Image,
    Npc5E
}

public static class MapEntityExtesion
{
    public static bool Resizable(this MapEntityType type)
    {
        return type switch
        {
            MapEntityType.Image => true,
            MapEntityType.Npc5E => false,
            _ => throw new ClientException("Map entity type not recognized"),
        };
    }
}