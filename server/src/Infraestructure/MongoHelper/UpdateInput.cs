namespace server.Infraestructure.MongoHelper;

public interface UpdateInput<in T>
{
    public Guid Id { get; }
    public void Apply(T value);
}
