using server.Infraestructure;

namespace Server.Graphql;

public class ErrorFilter: IErrorFilter
{
    // private readonly ILogger<ErrorFilter> _logger;
    private RwfDbContext _context;

    public ErrorFilter( RwfDbContext context)
    {
        _context = context;
    }

    public IError OnError(IError error)
    {
        // _logger.LogError( error.Exception, "An unhandled error was catched");

        return error;
    }
}