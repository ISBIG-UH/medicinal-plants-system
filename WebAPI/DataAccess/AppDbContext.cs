using Microsoft.EntityFrameworkCore;
using Data;
using Newtonsoft.Json;
using System.Runtime.InteropServices;

namespace DataAccess;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // Entities
    public DbSet<User> Users { get; set; }
    public DbSet<Plant> Plants { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed data
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Name = "Admin",
            }
        );

        modelBuilder.Entity<Plant>()
            .Property(p => p.Id)
            .ValueGeneratedOnAdd(); 

        modelBuilder.Entity<Plant>()
            .Property(p => p.Monograph)
            .HasConversion(
                v => JsonConvert.SerializeObject(v),  
                v => JsonConvert.DeserializeObject<Dictionary<string, object>>(v) 
            );
 
        SeedPlants(modelBuilder);

    }

    private void SeedPlants(ModelBuilder modelBuilder)
    {
    
        string basePath = AppDomain.CurrentDomain.BaseDirectory;
        string filePath = Path.Combine(basePath, "Resources", "monographs.json");

        if (!File.Exists(filePath))
        {
            Console.WriteLine($"❌ El archivo no existe en la ruta especificada: {filePath}");
            return;
        }

        string json = " ";
        try
        {
            json = File.ReadAllText(filePath);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Error al leer el archivo JSON: {ex.Message}");
            return;
        }

        Dictionary<string, dynamic> plantsData = null;

        try
        {
            plantsData = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(json);

            if (plantsData == null)
            {
                Console.WriteLine("❌ La deserialización devolvió un objeto nulo.");
                return;
            }

            Console.WriteLine($"✅ JSON deserializado correctamente. Número de elementos: {plantsData.Count}");
        }
        catch (JsonException jsonEx)
        {
            Console.WriteLine($"❌ Error de deserialización JSON: {jsonEx.Message}");
            return;
        }

        if (plantsData != null)
        {
            int idCounter = 1;

            foreach (var item in plantsData)
            {
                try
                {
                    var plantName = item.Key;
                    var plantMonograph = item.Value;

                    var plant = new Plant
                    {
                        Id = idCounter++,
                        Name = plantName,
                        Monograph = JsonConvert.DeserializeObject<Dictionary<string, object>>(plantMonograph.ToString())
                    };

                    modelBuilder.Entity<Plant>().HasData(plant);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"❌ Error al agregar la planta '{item.Key}': {ex.Message}");
                }
            }
        }
    }
}