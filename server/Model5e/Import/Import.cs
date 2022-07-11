using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using RollWithFriends.Models.Characters;
using RollWithFriends.Models.Serializer;

namespace RollWithFriends.Models.Import;

public class Import5E
{
    public Source Source { get; set; } = null!;

    public ICollection<Npc5EExport> NonPlayerCharacters { get; set; } = default!;

    public Import5E(Source source, ICollection<Npc5EExport>? nonPlayerCharacters = null)
    {
        Source = source;
        NonPlayerCharacters = nonPlayerCharacters ?? new List<Npc5EExport>();
    }

    public void SerializeToFile( string outputFilePath)
    {
        using var output = File.CreateText(outputFilePath);
        

        DataSerializer.GetDefaultSerializer().Serialize(output, this);
        
    }
}