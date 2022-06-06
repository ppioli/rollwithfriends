using System.Runtime.Serialization;

namespace server.Infraestructure;

public class ClientException : Exception
{
    public string DisplayMessage { get; set; }

    public ClientException(string displayMessage) : base(displayMessage)
    {
        DisplayMessage = displayMessage;
    }

    protected ClientException(SerializationInfo info, StreamingContext context, string displayMessage) : base(info, context)
    {
        DisplayMessage = displayMessage;
    }

    public ClientException(string? message, string displayMessage) : base(message)
    {
        DisplayMessage = displayMessage;
    }

    public ClientException(string? message, Exception? innerException, string displayMessage) : base(message, innerException)
    {
        DisplayMessage = displayMessage;
    }
}

public class EntityNotFound : ClientException
{
    public EntityNotFound(object id) : base($"The entity with id {id} could not be found")
    {
    }

}