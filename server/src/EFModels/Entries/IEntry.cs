namespace Server.EFModels.Entries;

[UnionType("Entry")]
[InterfaceType]
public interface IEntry
{
    public Guid Id { get; set; }
    public Guid SourceId { get; set; }
    public Guid OwnerId { get; set; }
}