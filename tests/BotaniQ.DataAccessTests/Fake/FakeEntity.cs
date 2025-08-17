using BotaniQ.Core.Data;

namespace BotaniQ.DataAccessTests.Fake;

public class FakeEntity : IEntity
{
    public int Id { get; set; }
    public int IntegerField { get; set; }
    public double DoubleField { get; set; }
    public string StringField { get; set; }
    public DateTime DateTimeField { get; set; }
    public bool BooleanField { get; set; }
}