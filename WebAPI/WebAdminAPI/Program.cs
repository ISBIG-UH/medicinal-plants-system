using DataAccess.InitialDataPopulation;
using Services;
using DataAccess;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;

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
        });
});

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDatabase(builder.Configuration.GetConnectionString("DefaultConnection"));
builder.Services.AddAdminServices();

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

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer(options =>
    {
        var jwtSettings = builder.Configuration.GetSection("Jwt");
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ClockSkew = TimeSpan.Zero,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"])),
            RoleClaimType = "role"
        };

        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                if (!context.Response.Headers.ContainsKey("Access-Control-Allow-Origin"))
                {
                    context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                }
                if (!context.Response.Headers.ContainsKey("Access-Control-Allow-Headers"))
                {
                    context.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");
                }

                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return Task.CompletedTask;
            },
            OnChallenge = context =>
            {
                if (!context.Response.HasStarted)
                {
                    if (!context.Response.Headers.ContainsKey("Access-Control-Allow-Origin"))
                    {
                        context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                    }
                    if (!context.Response.Headers.ContainsKey("Access-Control-Allow-Headers"))
                    {
                        context.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");
                    }

                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                }
                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddHostedService<PendingChangesProcessor>();

// register Seeders in the dependency container
builder.Services.AddTransient<UserSeed>();
builder.Services.AddTransient<PlantSeed>(); 
builder.Services.AddTransient<PlantTermSeed>(); 
builder.Services.AddTransient<PlantAppSeed>();

var app = builder.Build();

app.UseAuthentication(); 
app.UseAuthorization();

// Middleware for CORS
app.UseCors(AllowSpecificOrigins);

app.MapControllers();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAdminAPI Project v1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();


using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();

    var userSeedService = services.GetRequiredService<UserSeed>();
    await userSeedService.SeedUserAsync();

    var plantSeedService = services.GetRequiredService<PlantSeed>();
    await plantSeedService.SeedPlantsAsync();

    var termSeedService = services.GetRequiredService<PlantTermSeed>();
    await termSeedService.SeedPlantTermRelationshipAsync();

    var appSeedService = services.GetRequiredService<PlantAppSeed>();
    await appSeedService.SeedPlantAppRelationshipAsync();
}

app.Run();
