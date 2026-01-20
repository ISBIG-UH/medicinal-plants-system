

namespace BQ.Core.Exceptions;

public class AppAlreadyExistsException : Exception
{
    public AppAlreadyExistsException(string message) : base(message) { }
}

