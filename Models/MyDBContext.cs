using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;
using System.Reflection;
namespace FakeBackend
{
    public class MyDbContext : DbContext
    {
        public DbSet<Blog> Blogs { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=TestDatabase.db", options =>
            {
                options.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName);
            });
            base.OnConfiguring(optionsBuilder);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Map table names
            modelBuilder.Entity<Blog>().ToTable("Blogs", "test");
            modelBuilder.Entity<Blog>(entity =>
            {
                entity.HasIndex(e => e.BlogId).IsUnique();
            });
            modelBuilder.Entity<Blog>().Property(p => p.BlogId).ValueGeneratedOnAdd();

            base.OnModelCreating(modelBuilder);
        }
    }
}