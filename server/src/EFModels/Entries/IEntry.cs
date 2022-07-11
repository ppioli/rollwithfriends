namespace Server.EFModels.Entries;

[UnionType("Entry")]
[InterfaceType]
public interface IEntry
{
    public Guid Id { get; set; }
}