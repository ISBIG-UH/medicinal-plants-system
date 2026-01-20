using BQ.Authorization;
using BQ.Authorization.Extensions;
using BQ.Authorization.Jwt;
using BQ.Authorization.Linkers;
using BQ.Core;
using DataAccess;
using DataAccess.InitialDataPopulation;
using Services;
using WebAPI.Extensions;
using WebAPI.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS
const string AllowSpecificOrigins = "_allowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:5174")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
            policy.WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
// builder.Services.AddDatabase(builder.Configuration.GetConnectionString("DefaultConnection"));


builder.Services.AddDatabases(builder.Configuration);

builder.Services.AddHttpClient();

builder.Services.AddControllers();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "WebAPI Project",
        Version = "v1",
        Description = "API for managing and interacting with the database in plantsdb",
        Contact = new Microsoft.OpenApi.Models.OpenApiContact
        {
            Name = "Your Name",
            Email = "youremail@example.com"
        }
    });
});

var authBuilder = builder.Services.AddAuthentication();

builder.Services.AddAutoMapper(expression => { });
builder.Services.RegisterMapping();

var coreModuleLinker = new CoreModuleLinker();
coreModuleLinker.ConfigureServices(builder.Services, builder.Configuration);


builder.Services.AddAdminServices();
builder.Services.AddSignInManager<AppDbContext>();

// register Seeders in the dependency container
builder.Services.AddTransient<UserSeed>();
builder.Services.AddTransient<PlantSeed>(); 
builder.Services.AddTransient<PlantTermSeed>(); 
builder.Services.AddTransient<PlantAppSeed>();



var app = builder.Build();

// Middleware for CORS
app.UseCors(AllowSpecificOrigins);

app.MapControllers();

app.MigrateDatabases(builder.Configuration);



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPI Project v1");
        c.RoutePrefix = string.Empty; // Para que esté disponible en la raíz '/'
    });
}

app.UseMiddleware<ExceptionMiddleware>();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();

    var linker = new SeedLinker();
    await linker.SeedInitialData(scope);

    var userSeedService = services.GetRequiredService<UserSeed>();
    await userSeedService.SeedUserAsync();

    var plantSeedService = services.GetRequiredService<PlantSeed>();
    await plantSeedService.SeedPlantsAsync();

    var termSeedService = services.GetRequiredService<PlantTermSeed>();
    await termSeedService.SeedPlantTermRelationshipAsync();

    var appSeedService = services.GetRequiredService<PlantAppSeed>();
    await appSeedService.SeedPlantAppRelationshipAsync();
}

app.UseHttpsRedirection();

app.Run();
