using BotaniQ.Core.Data;

namespace BotaniQ.DataAccessTests.Fake;

public class FakeDto : IDto
{
    public int Id { get; set; }
    public int IntegerField { get; set; }
    public double DoubleField { get; set; }
    public string StringField { get; set; }
    public DateTime DateTimeField { get; set; }
    public bool BooleanField { get; set; }
}

public class FakeEqualityComparer : IEqualityComparer<FakeDto>
{
    public bool Equals(FakeDto? x, FakeDto? y)
    {
        var result =  x?.Id == y?.Id && x?.IntegerField == y?.IntegerField  && x?.DoubleField == y?.DoubleField &&
               x?.StringField == y?.StringField && x?.DateTimeField.Date == y?.DateTimeField.Date &&
               (x?.BooleanField == y?.BooleanField);

        return result;
    }

    public int GetHashCode(FakeDto obj)
    {
        return $"{obj.Id}::{obj.IntegerField}::{obj.StringField}::{obj.DateTimeField}::{obj.BooleanField}".GetHashCode();
    }
}