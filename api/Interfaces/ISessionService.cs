using fizzbuzz.Models;

namespace fizzbuzz.Interfaces
{
    public interface ISessionService
    {

        Task<List<GameSession>> GetAllGameSessionsAsync();
        Task<List<GameSession>> GetAllGameSessionsByPlayerAsync(int playerId);

        Task<GameSession?> GetGameSessionByIdAsync(int gameSessionId);
        Task<GameSession> AddGameSessionAsync(int playerId, int gameId, int duration);
        Task<int> GenerateRandomNumber(int gameSessionId);
        Task<GameSession> EndGameSessionAsync(int sessionId);

    }
}
