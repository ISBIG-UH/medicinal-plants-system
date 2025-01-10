using Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DataAccess.InitialDataPopulation
{
    public class PlantSeed
    {
        private readonly AppDbContext _context;

        public PlantSeed(AppDbContext context)
        {
            _context = context;
        }

        public async Task SeedPlantsAsync()
        {
            if (!_context.Plants.Any())
            {
                string basePath = AppDomain.CurrentDomain.BaseDirectory;
                string filePath = Path.Combine(basePath, "Resources", "data.json");

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

                Dictionary<string, JObject> plantsData = null;

                try
                {
                    plantsData = JsonConvert.DeserializeObject<Dictionary<string, JObject>>(json);

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

                var plants = new List<Plant>();

                foreach (var item in plantsData)
                {
                    try
                    {
                        var plantName = item.Key;
                        var plantMonograph = item.Value;

                        var plant = new Plant
                        {
                            Name = plantName,
                            Monograph = JsonConvert.DeserializeObject<Dictionary<string, object>>(plantMonograph.ToString()),
                            TotalWords = 0
                        };

                        plants.Add(plant);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"❌ Error al agregar la planta '{item.Key}': {ex.Message}");
                    }
                }

                if (plants.Any())
                {
                    try
                    {
                        await _context.Plants.AddRangeAsync(plants);
                        await _context.SaveChangesAsync();
                        Console.WriteLine("✅ Datos de plantas insertados correctamente.");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"❌ Error al guardar los datos de plantas en la base de datos: {ex.Message}");
                    }
                }
            }
            else
            {
                Console.WriteLine("⚠️ Ya existen datos en la tabla Plants. No se realizará la siembra de datos.");
            }
        }
    }
}