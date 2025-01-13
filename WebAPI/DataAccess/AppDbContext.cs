using Microsoft.EntityFrameworkCore;
using Data;
using NJ = Newtonsoft.Json;
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


        modelBuilder.Entity<Plant>()
            .Property(p => p.Id)
            .ValueGeneratedOnAdd();

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

 
        modelBuilder.Entity<TFIDF_Weights>()
            .Property(p => p.Id)
            .ValueGeneratedOnAdd(); 

        modelBuilder.Entity<TFIDF_Weights>()
            .HasIndex(t => new { t.Term, t.PlantId })  
            .IsUnique();  

        modelBuilder.Entity<TFIDF_Weights>()
            .HasOne(t => t.Plant) 
            .WithMany(p => p.TermWeight)  
            .HasForeignKey(t => t.PlantId)  
            .OnDelete(DeleteBehavior.Cascade); 

        modelBuilder
            .HasDbFunction(() => PostgresFunctions.Similarity(default, default))
            .HasName("similarity")
            .HasSchema("pg_catalog");

    }
}
