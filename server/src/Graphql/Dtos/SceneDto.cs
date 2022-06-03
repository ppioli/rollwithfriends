using AutoMapper;
using Server.EFModels;

namespace Server.Graphql.Dtos;

public class SceneBase
{
    public string Name { get; set; } = null!;
}

public class SceneInput : SceneBase
{
    
}

[Node]
[GraphQLName("Scene")]
public class SceneDto: SceneBase
{
    [ID]
    public int Id { get; set; }
    public List<MapEntityDto> Entities { get; set; } = new ();

    public static SceneDto Get(int id)
    {
        throw new NotImplementedException();
    }

    public static SceneDto Create(int id, string name, ICollection<MapEntityDto> tokens)
    {
        return new SceneDto()
        {
            Id = id,
            // Entities = new List<MapEntityDto>(tokens),
            Name = name,
        };
    }
}

public class SceneProfile : Profile
{
    public SceneProfile()
    {
        CreateMap<Scene, SceneBase>(MemberList.Destination);
        CreateMap<SceneBase, Scene>(MemberList.Source);

        CreateMap<Scene, SceneDto>(MemberList.Destination)
            .IncludeBase<Scene, SceneBase>();

        CreateMap<SceneInput, Scene>(MemberList.Source)
            .IncludeBase<SceneBase, Scene>();
    }
}