
using Newtonsoft.Json;
using RollWithFriends.Models.Characters;

namespace Server.EFModels.Character5E;

public class CharacterBase5E
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public int AvatarId { get; set; }
    public virtual AppFile Avatar { get; set; } = null!;

    private string _languages = "[]";
    public virtual Language[] Languages { 
        get => JsonConvert.DeserializeObject<Language[]>(_languages);
        set => _languages = JsonConvert.SerializeObject(value);
    }

    private string _senses = "[]";
    public virtual Sense[] Senses { 
        get => JsonConvert.DeserializeObject<Sense[]>(_senses);
        set => _senses = JsonConvert.SerializeObject(value);
    }

    public int PassivePerception { get; set; }

    private string _resistances = "[]";
    public virtual Resistance[] Resistances { 
        get => JsonConvert.DeserializeObject<Resistance[]>(_resistances);
        set => _resistances = JsonConvert.SerializeObject(value);
    }

    private string _speeds = "{}";
    public virtual Speed Speeds { 
        get => JsonConvert.DeserializeObject<Speed>(_speeds);
        set => _speeds = JsonConvert.SerializeObject(value);
    }
    
    public int Strength { get; set; }
    public int Dexterity { get; set; }
    public int Constitution { get; set; }
    public int Intelligence { get; set; }
    public int Wisdom { get; set; }
    public int Charisma { get; set; }

    protected CharacterBase5E()
    {
        
    }
    
    public CharacterBase5E(string name, AppFile file, int passivePerception, int strength, int dexterity, int constitution, int intelligence, int wisdom, int charisma)
    {
        Name = name;
        Avatar = file;
        PassivePerception = passivePerception;
        Strength = strength;
        Dexterity = dexterity;
        Constitution = constitution;
        Intelligence = intelligence;
        Wisdom = wisdom;
        Charisma = charisma;
    }
}