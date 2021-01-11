## 1. Goals
Logging is very important for security in my application.
It can help with detecting attacks, debugging and examining what 
is going on in the application.
So I want to log not only errors but also events that happen within 
the application.

## 2. Design
### 2.1 What To Log
I want to log the fellowing events:
- Creation of a job
- Job status change
- Sending of SSE messages
- Queries/ commands
- Auth events
- Exceptions

I also want to pay attention to not log any private information like the passwords of users.

### 2.3 Logging Technology
My project is build with the Asp.Net Core framework. I want to use 
the [Microsoft.Extensions.Logging](https://www.nuget.org/packages/Microsoft.Extensions.Logging/5.0.0-rc.2.20475.5) interface for logging.
This means using the provided ILogger interface provided by the Microsoft package. The package still needs a provider like
[this console provider](https://www.nuget.org/packages/Microsoft.Extensions.Logging.Console/5.0.0-rc.2.20475.5).

I want to use the ILogger abstraction with the [Serilog](https://serilog.net/) provider. I want to use Serlig because its easy
to use and has a nice way of customizing the output format.

### 2.4 Logging Format
Serilog extends the .Net string format so the output format can be changed without having to change allot of code.
It also has a concept called sinks. A sink is a way of outputting logs.
You can for example have a console sink and file sink.  
I will probably use two different sinks with different output formats.  
The format that I want to use for the console sink is going to look something like this:
```
00:00:00 [<level>] <message>
```
The goal of this format is to make it easily readable for humans like me.  

For the file sink I'm going to use a completely different format.
This format will output all values without comments in a Json format.  
Logging a request might look something like this:
```
_logger.LogInformation("{ProjectName} Request: {Name} {UserId} {UserName} {@Request}",
                _globalSettings.ProjectName, requestName, userId, userName, request);
```
Serilog knows through the string format interface what are values and what are comments.
This is how it can strip the comments away if you want it to.

## 3. Implementation Examples
The ILogger interface has multiple levels for logging messages. This helps with finding the most important logging messages that need
attention the quickest.

**The ILogger interface:**
```csharp
  /// <summary>Defines logging severity levels.</summary>
  public enum LogLevel
  {
    /// <summary>
    /// Logs that contain the most detailed messages. These messages may contain sensitive application data.
    /// These messages are disabled by default and should never be enabled in a production environment.
    /// </summary>
    Trace,
    /// <summary>
    /// Logs that are used for interactive investigation during development.  These logs should primarily contain
    /// information useful for debugging and have no long-term value.
    /// </summary>
    Debug,
    /// <summary>
    /// Logs that track the general flow of the application. These logs should have long-term value.
    /// </summary>
    Information,
    /// <summary>
    /// Logs that highlight an abnormal or unexpected event in the application flow, but do not otherwise cause the
    /// application execution to stop.
    /// </summary>
    Warning,
    /// <summary>
    /// Logs that highlight when the current flow of execution is stopped due to a failure. These should indicate a
    /// failure in the current activity, not an application-wide failure.
    /// </summary>
    Error,
    /// <summary>
    /// Logs that describe an unrecoverable application or system crash, or a catastrophic failure that requires
    /// immediate attention.
    /// </summary>
    Critical,
    /// <summary>
    /// Not used for writing log messages. Specifies that a logging category should not write any messages.
    /// </summary>
    None,
  }
```

Because I'm using Mediatr with a CQRS pattern in my application, its very easy to log all queries and commands.  
**Logging behaveiour for commands and queries:**
```csharp
public class LoggingBehaviour<TRequest> : IRequestPreProcessor<TRequest>
{
    private readonly ILogger _logger;
    private readonly ICurrentUserService _currentUserService;
    private readonly GlobalSettings _globalSettings;
    
    public LoggingBehaviour(ILogger<TRequest> logger, ICurrentUserService currentUserService, GlobalSettings globalSettings){...}

    public Task Process(TRequest request, CancellationToken cancellationToken)
    {
        string requestName = typeof(TRequest).Name;
        string userId = _currentUserService.UserId ?? string.Empty;
        string userName = string.Empty;

        if (!string.IsNullOrEmpty(userId))
        {
            userName = _currentUserService.UserEmail;
        }

        _logger.LogInformation("{ProjectName} Request: {Name} {@UserId} {@UserName} {@Request}",
            _globalSettings.ProjectName, requestName, userId, userName, request);
        
        return Task.CompletedTask;
    }
}
```

Something similar can be achieved for logging exceptions. By creating a different middleware for catching exceptions and logging
them before handling them gracefully with a MVC filter. 

```csharp
public class UnhandledExceptionBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
{
    private readonly ILogger<TRequest> _logger;
    private readonly GlobalSettings _globalSettings;

    public UnhandledExceptionBehaviour(ILogger<TRequest> logger, GlobalSettings globalSettings){...}

    public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
    {
        try
        {
            return await next();
        }
        catch (Exception ex)
        {
            string requestName = typeof(TRequest).Name;

            _logger.LogError(ex, "{ProjectName} Request: Unhandled Exception for Request {Name} {@Request}", 
                _globalSettings.ProjectName, requestName, request);

            throw;
        }
    }
}
```

For other events like domain events I need to call the log function in every event. This is necessary because every event is different.
And writing a behaviour for every Mediatr notification can't be done without missing out on allot of information about the event that
otherwise could be used to log more useful information.
