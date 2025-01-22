namespace Exceptions;

public class AppNotFoundException : Exception
{
    public AppNotFoundException(string message) : base(message) { }
}
