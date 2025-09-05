using Microsoft.EntityFrameworkCore;
using fizzbuzz.Models; 
namespace fizzbuzz.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Player> Players { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Rule> Rules { get; set; }
        public DbSet<GameSession> GameSessions { get; set; }
        public DbSet<Answer> Answers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Player → GameSessions (1:N)
            modelBuilder.Entity<Player>()
                .HasMany(p => p.GameSessions)
                .WithOne(gs => gs.Player)
                .HasForeignKey(gs => gs.PlayerId)
                .OnDelete(DeleteBehavior.Cascade);

            // Game → Rules (1:N)
            modelBuilder.Entity<Game>()
                .HasMany(g => g.Rules)
                .WithOne(r => r.Game)
                .HasForeignKey(r => r.GameId)
                .OnDelete(DeleteBehavior.Cascade);

            // Game → GameSessions (1:N)
            modelBuilder.Entity<Game>()
                .HasMany(g => g.GameSessions)
                .WithOne(gs => gs.Game)
                .HasForeignKey(gs => gs.GameId)
                .OnDelete(DeleteBehavior.Cascade);

            // GameSession → SessionNumberHistory (1:N)
            modelBuilder.Entity<GameSession>()
                .HasMany(gs => gs.Answers)
                .WithOne(a => a.GameSession)
                .HasForeignKey(a => a.GameSessionId)
                .OnDelete(DeleteBehavior.Cascade);

            // Unique constraints

            // Unique constraint for GameId and Divisor in Rule
            modelBuilder.Entity<Rule>()
                .HasIndex(r => new { r.GameId, r.Divisor })
                .IsUnique();

            // Unique constraint for GameId and Replacement in Rule
            modelBuilder.Entity<Rule>()
                .HasIndex(r => new { r.GameId, r.Replacement })
                .IsUnique();

            // Unique constraint for GameSessionId and Number in Answer
            modelBuilder.Entity<Answer>()
                .HasIndex(a => new { a.GameSessionId, a.Number })
                .IsUnique();

            // Unique constraint for Game Name
            modelBuilder.Entity<Game>()
                .HasIndex(g => new { g.GameName})
                .IsUnique();

            // Unique constraint for Player Username
            modelBuilder.Entity<Player>()
                .HasIndex(p => new { p.Username })
                .IsUnique();
        }
    }

}
