using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using RollWithFriends.Models.Import;

namespace RollWithFriends.Models.Serializer;

public static class DataSerializer
{

    public static JsonSerializer GetDefaultSerializer()
    {
        var serializer = new JsonSerializer();
        DefaultContractResolver contractResolver = new DictionaryAsArrayResolver
        {
            NamingStrategy = new CamelCaseNamingStrategy()
        };
        serializer.ContractResolver = contractResolver;
        serializer.Formatting = Formatting.Indented;
        serializer.Converters.Add(
            new Newtonsoft.Json.Converters.StringEnumConverter(new UpperCaseNamingStrategy()));

        return serializer;
    }
}