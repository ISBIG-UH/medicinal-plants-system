namespace BQ.Core.Exceptions;

public class AppNotFoundException : Exception
{
    public AppNotFoundException(string message) : base(message) { }
}
