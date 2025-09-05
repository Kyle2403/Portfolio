using fizzbuzz.Data;
using fizzbuzz.Models;
using Microsoft.EntityFrameworkCore;
using fizzbuzz.Interfaces;
namespace fizzbuzz.Services
{
    public class GameService: IGameService
    {
        private readonly AppDbContext dbContext;
        public GameService(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Game?> GetGameByIdAsync(int gameId)
        {
            // Find a game by its ID
            return await dbContext.Games
                .Include(g => g.Rules)       
                .FirstOrDefaultAsync(g => g.GameId == gameId);
        }

        public async Task<List<Game>> GetAllGamesAsync()
        {
            // Retrieve all games from the database
            return await dbContext.Games
                .Include(g => g.Rules)   // Include related rules
                .ToListAsync();
        }   

        public async Task<Game> AddGameAsync(string gameName, string author, int rangeMin, int rangeMax)
        {
            // Check if a game with the same name already exists
            var existingGame = await dbContext.Games
                .FirstOrDefaultAsync(g => g.GameName == gameName);
            if (existingGame == null)
            {
                // a game has many rules, so we can just create a game without rules for now
                // onnly when we add rules, we will need to make sure the game exists due to foreign key constraints
                var game = new Game
                {
                    GameName = gameName,
                    Author = author,
                    RangeMin = rangeMin,
                    RangeMax = rangeMax
                };
                // If it doesn't exist, add the new game
                dbContext.Games.Add(game);
                await dbContext.SaveChangesAsync();
                return game;
            }
            // If it exists, throw an exception
            throw new InvalidOperationException($"A game with the name '{gameName}' already exists.");
        }
    }
}
