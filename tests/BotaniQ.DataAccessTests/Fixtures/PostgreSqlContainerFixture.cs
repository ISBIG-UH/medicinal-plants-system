using Testcontainers.PostgreSql;
using Testcontainers.Xunit;
using Xunit.Abstractions;

namespace BotaniQ.DataAccessTests.Fixtures;

[UsedImplicitly]
public sealed class PostgreSqlContainerFixture(IMessageSink messageSink)
    : ContainerFixture<PostgreSqlBuilder, PostgreSqlContainer>(messageSink);