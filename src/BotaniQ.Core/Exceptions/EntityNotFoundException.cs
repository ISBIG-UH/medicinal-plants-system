namespace BotaniQ.Core.Exceptions;

/// <summary>
/// The exception that is thrown when the entity searched is not found.
/// </summary>
public sealed class EntityNotFoundException : Exception
{
    /// <summary>
    /// Initialize a new instance of the <see cref="T:BotaniQ.Core.Exceptions.EntityNotFoundException"></see> class.
    /// </summary>
    public EntityNotFoundException() : base("Entity not found.") { }

    /// <summary>
    /// Initialize a new instance of the <see cref="T:BotaniQ.Core.Exceptions.EntityNotFoundException"></see> class with a specified message.
    /// </summary>
    /// <param name="message">The message that describes the error.</param>
    public EntityNotFoundException(string message) : base(message) { }
}