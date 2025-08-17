namespace BotaniQ.Core.Data;

public interface IDto<TKey> where TKey: IEquatable<TKey>
{
    TKey Id { get; set; }
}

public interface IDto : IDto<int>;