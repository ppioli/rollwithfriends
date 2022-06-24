using System.Collections;
using Newtonsoft.Json.Serialization;

namespace RollWithFriends.Models.Import;

public class DictionaryAsArrayResolver : DefaultContractResolver
{
    protected override JsonContract CreateContract(Type objectType)
    {
        if (objectType.GetInterfaces().Any(i => i == typeof(IDictionary) || 
                                                (i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IDictionary<,>))))
        {
            return base.CreateArrayContract(objectType);
        }

        return base.CreateContract(objectType);
    }
}