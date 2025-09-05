using fizzbuzz.Data;
using fizzbuzz.Models;
using Microsoft.EntityFrameworkCore;
using fizzbuzz.Interfaces;
namespace fizzbuzz.Services
{
    public class SessionService: ISessionService
    {
        private readonly AppDbContext dbContext;
        public SessionService(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<GameSession>> GetAllGameSessionsAsync()
        {
            // Retrieve all game sessions from the database
            return await dbContext.GameSessions
                .Include(gs => gs.Game)
                .Include(gs => gs.Player)
                .Include(gs => gs.Answers)
                .ToListAsync();
        }

        public async Task<List<GameSession>> GetAllGameSessionsByPlayerAsync(int playerId)
        {
            // Retrieve all game sessions from the database
            return await dbContext.GameSessions
                .Where(gs => gs.PlayerId == playerId)
                .Include(gs => gs.Game)
                .Include(gs => gs.Player)
                .ToListAsync();
        }

        public async Task<GameSession?> GetGameSessionByIdAsync(int gameSessionId)
        {
            // Retrieve a specific game session by ID
            return await dbContext.GameSessions
                .Where(gs => gs.GameSessionId == gameSessionId)
                .Include(gs => gs.Game)
                .Include(gs => gs.Player)
                .Include(gs =>gs.Answers)
                .FirstOrDefaultAsync(gs => gs.GameSessionId == gameSessionId);
        }
        public async Task<GameSession> AddGameSessionAsync(int playerId, int gameId, int duration)
        {
            // Check if the player exists
            var playerExists = await dbContext.Players.AnyAsync(p => p.PlayerId == playerId);
            if (!playerExists)
            {
                throw new KeyNotFoundException($"Player with ID {playerId} not found.");
            }
            // Check if the game exists
            var gameExists = await dbContext.Games.AnyAsync(g => g.GameId == gameId);
            if (!gameExists)
            {
                throw new KeyNotFoundException($"Game with ID {gameId} not found.");
            }
            // Create a new GameSession
            var session = new GameSession
            {
                PlayerId = playerId,
                GameId = gameId,
                StartTime = DateTime.UtcNow,
                Duration = duration,
                EndTime = DateTime.UtcNow.AddSeconds(duration)
            };
            // Add the session to the database
            dbContext.GameSessions.Add(session);
            await dbContext.SaveChangesAsync();
            var fullSession = await dbContext.GameSessions
                .Include(s => s.Game)
                .Include(s => s.Player)
                .Include(s => s.Answers)
                .FirstOrDefaultAsync(s => s.GameSessionId == session.GameSessionId);
            
            return fullSession;
        }

        // fix this to include answer in session
        public async Task<int> GenerateRandomNumber(int gameSessionId)
        {
            var session = await dbContext.GameSessions
                .Include(gs => gs.Game)
                .Include(gs => gs.Answers) // Include answers to check for duplicates
                .FirstOrDefaultAsync(gs => gs.GameSessionId == gameSessionId);
            
            
            if (session == null)
                throw new KeyNotFoundException($"GameSession with ID {gameSessionId} not found.");
            if (session.IsDone||DateTime.UtcNow > session.EndTime)
                throw new InvalidOperationException($"GameSession with ID {gameSessionId} already ended.");
            var min = session.Game.RangeMin;
            var max = session.Game.RangeMax;
            var existingNumbers = session.Answers.Select(a => a.Number).ToList();
            var random = new Random();
            int number;
            bool exists;

            do
            {
                number = random.Next(min, max + 1);
                exists = existingNumbers.Contains(number);
                //exists = await dbContext.Answers
                //    .AnyAsync(a => a.GameSessionId == gameSessionId && a.Number == number);
            } while (exists);

            return number;
        }

        public async Task<GameSession> EndGameSessionAsync(int sessionId)
        {
            var session = await dbContext.GameSessions
                .Include(gs => gs.Game)
                .Include(gs => gs.Player)
                .Include(gs => gs.Answers)
                .FirstOrDefaultAsync(s => s.GameSessionId == sessionId);

            if (session == null)
                throw new KeyNotFoundException($"Game session with ID {sessionId} not found.");
            if (session.IsDone) return session;

            //if (session.EndTime != null)
            //{
            //    throw new Exception("Game session already ended.");
            //}

            // Get all answers for this session
            var answers = session.Answers.ToList();
            int correctCount = answers.Count(a => a.IsCorrect);
            int incorrectCount = answers.Count(a => !a.IsCorrect&& !string.IsNullOrWhiteSpace(a.Response));

            session.ScoreCorrect = correctCount;
            session.ScoreIncorrect = incorrectCount;
            session.IsDone = true;

            await dbContext.SaveChangesAsync();
            return session;
        }
    }
}
