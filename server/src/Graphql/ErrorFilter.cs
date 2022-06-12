namespace Server.Graphql;

public class ErrorFilter: IErrorFilter
{
    private readonly ILogger<ErrorFilter> _logger;

    public ErrorFilter(ILogger<ErrorFilter> logger)
    {
        _logger = logger;
    }

    public IError OnError(IError error)
    {
        _logger.LogError( error.Exception, "An unhandled error was catched");

        return error;
    }
}