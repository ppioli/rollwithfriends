using Server.EFModels;

namespace Server.Graphql.Types;

public class UserType : ObjectType<ApplicationUser>
{
    protected override void Configure(IObjectTypeDescriptor<ApplicationUser> descriptor)
    {
        descriptor.Name("User");
        
        descriptor.BindFieldsExplicitly();

        descriptor.Field(e => e.UserName);
        descriptor.Field(e => e.Email);


    }
}