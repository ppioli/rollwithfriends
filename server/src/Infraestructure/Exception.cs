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
    public EntityNotFound(object id, string? entityName = null) : base($"The {entityName ?? "entity"} with id {id} could not be found")
    {
    }

}

public class NotAuthorizedException : ClientException
{
    public NotAuthorizedException( string resource) : base($"The {resource ?? resource} does not exist or the user does not belong to it")
    {
    }

}

public class ApiException : Exception
{
    public string DisplayMessage { get; set; }

    public ApiException(string displayMessage) : base(displayMessage)
    {
        DisplayMessage = displayMessage;
    }

    protected ApiException(SerializationInfo info, StreamingContext context, string displayMessage) : base(info, context)
    {
        DisplayMessage = displayMessage;
    }

    public ApiException(string? message, string displayMessage) : base(message)
    {
        DisplayMessage = displayMessage;
    }

    public ApiException(string? message, Exception? innerException, string displayMessage) : base(message, innerException)
    {
        DisplayMessage = displayMessage;
    }
}

public class DbException : ApiException
{
    public DbException(string? displayMessage = null) : base(displayMessage ?? "The result didn't match the expected value")
    {
    }
}
