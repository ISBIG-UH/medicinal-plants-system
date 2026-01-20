namespace BQ.Core.Exceptions;

/// <summary>
/// The exception that is thrown when the entity searched is not found.
/// </summary>
public sealed class EntityNotFoundException : Exception
{

    public EntityNotFoundException() : base("Entity not found.") { }
    
    public EntityNotFoundException(string message) : base(message) { }
}