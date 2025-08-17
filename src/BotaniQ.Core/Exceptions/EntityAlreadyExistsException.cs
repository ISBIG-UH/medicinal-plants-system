namespace BotaniQ.Core.Exceptions;

public class EntityAlreadyExistsException : Exception
{
    
    /// <summary>
    /// Initialize a new instance of the <see cref="T:BotaniQ.Core.Exceptions.EntityNotFoundException"></see> class.
    /// </summary>
    public EntityAlreadyExistsException() : base("Entity not found.") { }

    /// <summary>
    /// Initialize a new instance of the <see cref="T:BotaniQ.Core.Exceptions.EntityNotFoundException"></see> class with a specified message.
    /// </summary>
    /// <param name="message">The message that describes the error.</param>
    public EntityAlreadyExistsException(string message) : base(message) { }
}