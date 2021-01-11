## 1. Different Validations

Input validations is the most effective way to block injection attacks.
But it does more then just transform input in save characters.
It is also needed to make sure that users don't insert nonsense into the system.  
This could cause exceptions inside the system.
LaserPointer might for example expect a hash to be in a certain format and exceptions might occur when that is not the case.

Validating of input happens at multiple points in the application.  
Asp.Net Core is already pretty safe out of the box due to automatically encoding HTML.
For example, \ gets encoded into \&lt.  
Entity Framework uses parameters inside queries stopping Sql injections.
Because LaserPointer is a code first application, Entity Framework knows the constraints on the tables.
This makes checking the objects easy like you will see later in this blog post.

The only thing that remains is validating input per query.
For example when creating a user an email address is provided, the application could use a regular expression to validate the format.  
This article will be focus on how to do this in a clean and easy way in Asp.Net Core.

## 2. Writing Validations

For validating the input I will be using [Fluent Validation](https://fluentvalidation.net/).
Fluent Validation makes creating validation rules super easy.  
A simple validation class might look something like this:

```csharp
public class CreateJobCommandValidator : AbstractValidator<CreateJobCommand>
    {
        public CreateJobCommandValidator()
        {
            RuleFor(j => j.HashType)
                .NotNull();
           
            RuleFor(j => j.HexHashes).NotEmpty();
            
            RuleForEach(j => j.HexHashes)
                .Length(64)
                .NotEmpty();
        }
    }
```

This validation has a couple of simple rules making sure that the values that get passed to the query are correct.
Validations can do allot more then just check the properties of values.  
A good way to improve this validation could be to inject the database context like this:

```csharp
private readonly IApplicationDbContext _context;

public CreateTodoListCommandValidator(IApplicationDbContext context)
}
    _context = context;
    ...
}
```
Now the validation can query the database for for example a regular expression for this hash type.
This makes the validation very powerful and easy to use.  
Fluent Validation has many more features that you can use, you can find them in [their docs](https://docs.fluentvalidation.net/en/latest/index.html).

## 3. The Pipeline Behaviour

The validations like the one I just showed you need to be executed some where.
And when these checks fail, we need to throw an exception that the system can use to inform the user.  
The behaviour that is being used in LaserPointer right now looks like this:

```csharp
public class ValidationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
    {
        private readonly IEnumerable<IValidator<TRequest>> _validators;

        public ValidationBehaviour(IEnumerable<IValidator<TRequest>> validators)
        {
            _validators = validators;
        }

        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            if (_validators.Any())
            {
                var context = new ValidationContext<TRequest>(request);
		
		// Execute the validators
                var validationResults = await Task.WhenAll(_validators.Select(v => v.ValidateAsync(context, cancellationToken)));
                var failures = validationResults.SelectMany(r => r.Errors).Where(f => f != null).ToList();
		
		// Throw an exception if the validations contain any errors
                if (failures.Count != 0)
                    throw new ValidationException(failures);
            }
            return await next();
        }
    }
```

## 4. Handling Exceptions

In LaserPointer I use a ExceptionFilterAttribute class to catch any errors that occur.
This class can handle exceptions based on the type.  
For validation exceptions the class response with a simple bad request response.
This could still be improved by letting the users know what values weren't accepted by the system.
But this easier said then done, because for some queries the system doesn't want to let the user know what value wasn't accepted.

The exceptions handling code for validation exceptions:

```csharp
private void HandleValidationException(ExceptionContext context)
{
    var exception = context.Exception as ValidationException;

    var details = new ValidationProblemDetails(exception.Errors)
    {
        Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1"
    };

    context.Result = new BadRequestObjectResult(details);

    context.ExceptionHandled = true;
}
```
