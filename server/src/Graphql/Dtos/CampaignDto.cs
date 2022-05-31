using AutoMapper;
using Server.EFModels;

namespace Server.Graphql.Dtos;

public class CampaignBase
{
    public string Name { get; set; }
    public string Description { get; set; }
}

public class CampaignInput : CampaignBase
{
}

[Node]
public class CampaignDto : CampaignBase
{
    [ID]
    public int Id { get; set; }

    // public SceneDto SelectedScene { get; set; } = null!;
    // public ICollection<SceneDto> Scenes { get; set; } = null!;
    // public ICollection<UserDto> Participants { get; set; } = null!;

    public static CampaignDto Get(int id)
    {
        throw new NotImplementedException();
    }
}

public class CampaignProfile : Profile
{
    public CampaignProfile()
    {
        CreateMap<Campaign, CampaignBase>(MemberList.Destination);
        CreateMap<CampaignBase, Campaign>(MemberList.Source);

        CreateMap<Campaign, CampaignDto>(MemberList.Destination)
            .IncludeBase<Campaign, CampaignBase>();
            // .ForMember(c => c.Participants, 
            //     opt => opt.MapFrom(c => c.CampaignEnrollments.Select(e => e.User).ToList()));

        CreateMap<CampaignInput, Campaign>(MemberList.Source)
            .IncludeBase<CampaignBase, Campaign>();
    }
}