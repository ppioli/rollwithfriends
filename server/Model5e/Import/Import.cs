using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using RollWithFriends.Models.Characters;
using RollWithFriends.Models.Serializer;

namespace RollWithFriends.Models.Import;

public class Import5E
{
    public SourceAdd Source { get; set; } = null!;

    public ICollection<Npc5EAdd> NonPlayerCharacters { get; set; } = default!;

    public Import5E(SourceAdd source, ICollection<Npc5EAdd>? nonPlayerCharacters = null)
    {
        Source = source;
        NonPlayerCharacters = nonPlayerCharacters ?? new List<Npc5EAdd>();
    }

    public void SerializeToFile( string outputFilePath)
    {
        using var output = File.CreateText(outputFilePath);
        

        DataSerializer.GetDefaultSerializer().Serialize(output, this);
        
    }
}