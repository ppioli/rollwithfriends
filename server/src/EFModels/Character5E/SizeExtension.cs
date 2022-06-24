using RollWithFriends.Models.Characters;

namespace Server.EFModels.Character5E;

public static class SizeExtension
{
    public static int GetEditorSize(this Size5E size)
    {
        var intSize = (int)size;
        if ( intSize < 2)
        {
            return 1;
        }

        return intSize - 1;
    }
}