using Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Exceptions; 

namespace DataAccess.InitialDataPopulation
{
    public class PlantAppSeed
    {
        private readonly AppDbContext _context;

        public PlantAppSeed(AppDbContext context)
        {
            _context = context;
        }

        public async Task SeedPlantAppRelationshipAsync()
        {
            if(! await _context.Apps.AnyAsync())
            {
                string basePath = AppDomain.CurrentDomain.BaseDirectory;
                string filePath = Path.Combine(basePath, "Resources", "apps.json");

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

                Dictionary<string, JObject> appsData = null;

                try
                {
                    appsData = JsonConvert.DeserializeObject<Dictionary<string, JObject>>(json);

                    if (appsData == null)
                    {
                        Console.WriteLine("❌ La deserialización devolvió un objeto nulo.");
                        return;
                    }

                    Console.WriteLine($"✅ JSON deserializado correctamente. Número de elementos: {appsData.Count}");
                }
                catch (JsonException jsonEx)
                {
                    Console.WriteLine($"❌ Error de deserialización JSON: {jsonEx.Message}");
                    return;
                }

                foreach (var item in appsData)
                {
                    var appName = item.Key;
                    var content = JsonConvert.DeserializeObject<Dictionary<string, string[]>>(item.Value.ToString());

                    var newApp = new App
                    {
                        Name = appName,
                        Sys = Array.Empty<string>()
                    };
                    
                    _context.Apps.Add(newApp);
                    await _context.SaveChangesAsync();

                    var app = await _context.Apps.FirstOrDefaultAsync(p => p.Name == appName);

                    foreach (var x in content)
                    {
                        if (x.Key == "plants")
                        {
                            foreach (var value in x.Value)
                            {
                                var plant = await _context.Plants.FirstOrDefaultAsync(p => p.Name == value);

                                try
                                {
                                    var register = new PlantApp
                                    {
                                        PlantId = plant.Id,
                                        Plant = plant,
                                        AppId = app.Id,
                                        App = app
                                    };

                                    _context.PlantApps.Add(register);
                                }
                                catch (Exception ex)
                                {
                                    Console.WriteLine($"❌ Error al encontar la planta '{value}': {ex.Message}");
                                }
                            }
                        }
                        else if (x.Key == "sys")
                        {
                            app.Sys = x.Value;
                        }
                    }

                    await _context.SaveChangesAsync();      
                }
            }
        }
    }
}