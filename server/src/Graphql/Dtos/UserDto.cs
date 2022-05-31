using AutoMapper;
using Server.Graphql.Dtos;

namespace Server.EFModels;

[Node]
public class UserDto
{
    [ID]
    public string Id { get; set; } = null!;

    public string UserName { get; set; } = null!;
    public ICollection<CampaignDto> Campaigns { get; set; } = null!;

    public static UserDto Get(int id)
    {
        throw new NotImplementedException();
    }
}

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDto>(MemberList.Destination)
            .ForMember(
                s => s.Campaigns,
                opt => opt.MapFrom(u => u.CampaignEnrollments.Select(e => e.Campaign)));
    }
}