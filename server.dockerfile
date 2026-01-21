# -------- BUILD STAGE --------
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
# WORKDIR /src

# Copy solution and restore dependencies
COPY BotaniQ.sln .
COPY WebAPI/ ./WebAPI/

RUN dotnet restore WebAPI/WebAPI.sln

# Build & publish
RUN dotnet publish ./WebAPI/WebAPI/WebAPI.csproj \
    -c Release \
    -o /app/publish \
    --no-restore


# -------- RUNTIME STAGE --------
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Copy published output
COPY --from=build /app/publish .

# ASP.NET Core default port
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# Run the app
ENTRYPOINT ["dotnet", "WebAPI.dll"]
