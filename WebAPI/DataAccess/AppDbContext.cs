using Microsoft.EntityFrameworkCore;
using Data;
using NJ = Newtonsoft.Json;
using STJ = System.Text.Json;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Reflection.Metadata.Ecma335;
using System.Text.RegularExpressions;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DataAccess;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    // Entities
    public DbSet<User> Users { get; set; }
    public DbSet<Plant> Plants { get; set; }
    public DbSet<TFIDF_Weights> TermDocumentWeights { get; set; }

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

        // define a comparator for the Monograph property
        var monographComparer = new ValueComparer<Dictionary<string, object>>(
            (c1, c2) => c1 != null && c2 != null && c1.Count == c2.Count && !c1.Except(c2).Any(),  
            c => c == null ? 0 : c.Count,  
            c => c == null ? null : new Dictionary<string, object>(c)  
        );

        modelBuilder.Entity<Plant>()
            .Property(p => p.Monograph)
            .HasConversion(
                v => NJ.JsonConvert.SerializeObject(v),  
                v => NJ.JsonConvert.DeserializeObject<Dictionary<string, object>>(v))
            .Metadata.SetValueComparer(monographComparer);

 
        SeedPlants(modelBuilder);


        modelBuilder.Entity<TFIDF_Weights>()
            .Property(p => p.Id)
            .ValueGeneratedOnAdd(); 

        modelBuilder.Entity<TFIDF_Weights>()
            .HasIndex(t => new { t.Term, t.PlantName })  
            .IsUnique();  

        modelBuilder.Entity<TFIDF_Weights>()
            .HasOne(t => t.Plant) 
            .WithMany()  
            .HasForeignKey(t => t.PlantName)  
            .OnDelete(DeleteBehavior.Cascade); 


       SeedTFIDF_Weights(modelBuilder);

    }


    private void SeedPlants(ModelBuilder modelBuilder)
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
            plantsData = NJ.JsonConvert.DeserializeObject<Dictionary<string, JObject>>(json);

            if (plantsData == null)
            {
                Console.WriteLine("❌ La deserialización devolvió un objeto nulo.");
                return;
            }

            Console.WriteLine($"✅ JSON deserializado correctamente. Número de elementos: {plantsData.Count}");
        }
        catch (NJ.JsonException jsonEx)
        {
            Console.WriteLine($"❌ Error de deserialización JSON: {jsonEx.Message}");
            return;
        }

        if (plantsData != null)
        {
            foreach (var item in plantsData)
            {
                try
                {
                    var plantName = item.Key;
                    var plantMonograph = item.Value;

                    var plant = new Plant
                    {
                        Name = plantName,
                        Monograph = NJ.JsonConvert.DeserializeObject<Dictionary<string, object>>(plantMonograph.ToString())
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


    private void SeedTFIDF_Weights(ModelBuilder modelBuilder)
    {
        string basePath = AppDomain.CurrentDomain.BaseDirectory;

        string stopWordsFilePath = Path.Combine(basePath, "Resources", "stop_words.json");
        var stopWordsJson = File.ReadAllText(stopWordsFilePath);
        List<string> stopWords = STJ.JsonSerializer.Deserialize<List<string>>(stopWordsJson) ?? new List<string>();

        string monographsFilePath = Path.Combine(basePath, "Resources", "data.json");
        var monographsJson = File.ReadAllText(monographsFilePath);
        Dictionary<string, JObject> monographsData = NJ.JsonConvert.DeserializeObject<Dictionary<string, JObject>>(monographsJson)
                                  ?? new Dictionary<string, JObject>();

        // for each document, the total number of words is stored, and for each word, the count of its occurrences
        var dataProcessor = new Dictionary<string, (int, Dictionary<string, int>)>();

        // for each term, the list of documents in which it appears is stored
        var termDocumentRelationship = new Dictionary<string, List<string>>();

        foreach (var(key, dataValue) in monographsData)
        {
            var tokenCounter = new Dictionary<string, int>();

            string normalizedKey = key.ToLower();
            tokenCounter[normalizedKey] = 1;
            int totalWords = 1;

            if (!termDocumentRelationship.ContainsKey(normalizedKey))
            {
                termDocumentRelationship[normalizedKey] = new List<string>();
            }
            termDocumentRelationship[normalizedKey].Add(key);


            if (dataValue is JObject dataObject)
            {
                foreach (var subProperty in dataObject)
                {
                    string subKey = subProperty.Key; 
                    var value = subProperty.Value;  

                    string text = "";

                    if (value is JValue jValue && jValue.Type == JTokenType.String)
                    {
                        text = jValue.ToString().ToLower();
                    }
                    else if (value is JArray jArray)
                    {
                        text = string.Join(" ", jArray.Select(item => item.ToString().ToLower()));
                    }
                    else
                    {
                        Console.WriteLine($"❌ La clave '{key}' tiene un tipo desconocido: {value.GetType()}");
                    }

                    totalWords += TokenizeAndCount(text, tokenCounter, termDocumentRelationship, key, stopWords);
                }
            }

            dataProcessor[key] = (totalWords, tokenCounter);
        }

        Console.WriteLine("🌱 Iniciando siembra de datos TF-IDF...");
        int id = 1;
        foreach (var (plantName, (totalWords, tokenOccurrences)) in dataProcessor)
        {
            foreach (var (token, count) in tokenOccurrences)
            {
                try
                {   
                    var item = new TFIDF_Weights
                    {
                        Id = id,
                        Term = token,
                        TermCount = count,
                        PlantName = plantName,
                        TotalWords = totalWords,
                        Value = (float)CalculateTFIDF(count, totalWords, dataProcessor.Count, token, termDocumentRelationship)
                    };
                    
                    modelBuilder.Entity<TFIDF_Weights>().HasData(item);
                    id++;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"❌ Error al agregar el término '{token}' asociado a la planta '{plantName}': {ex.Message}");
                }
            }
        }
    }

    // this method tokenizes the input text, counts the frequency of each token,
    // and updates the term-document relationship, associating each term with the documents (plant names) in which it appears.
    private int TokenizeAndCount(string text, Dictionary<string, int> tokenCounter, Dictionary<string, List<string>> termDocumentRelationship, string plantName, List<string> stopWords)
    {
        int totalWords = 0;
        var tokens = text.Split(new[] { ' ', ',', '.', ';', ':', '(', ')'}, StringSplitOptions.RemoveEmptyEntries);

        foreach (var token in tokens)
        {
            if (!stopWords.Contains(token) && Regex.IsMatch(token, @"^[a-záéíóúñ]{2,}$"))
            {
                if (tokenCounter.ContainsKey(token))
                {
                    tokenCounter[token]++;
                    totalWords++;
                }
                else
                {
                    tokenCounter[token] = 1;
                    totalWords++;
                }

                if (!termDocumentRelationship.ContainsKey(token))
                {
                    termDocumentRelationship[token] = new List<string>(); 
                }

                if (!termDocumentRelationship[token].Contains(plantName))
                {
                    termDocumentRelationship[token].Add(plantName); 
                }

            }
        }

        return totalWords;
    }


    private double CalculateTFIDF(int tokenCount, int totalWords, int totalDocuments, string term, Dictionary<string, List<string>> termDocumentRelationship)
    {
        double tf = (double)tokenCount / totalWords;

        double idf = (double)Math.Log(totalDocuments / termDocumentRelationship[term].Count() + 1);

        return tf * idf;
      
    }
}

        

