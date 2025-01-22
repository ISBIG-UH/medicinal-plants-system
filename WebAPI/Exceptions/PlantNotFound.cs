namespace Exceptions;

public class PlantNotFoundException : Exception
{
    public PlantNotFoundException(string message) : base(message) { }
}
