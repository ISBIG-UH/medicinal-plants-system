namespace BQ.Server;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddAuthorization();

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        
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
        
        builder.Services.AddControllers();

        var app = builder.Build();
        
        app.MapControllers();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.Run();
    }
}