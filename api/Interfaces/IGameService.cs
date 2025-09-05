using fizzbuzz.Models;

namespace fizzbuzz.Interfaces
{
    public interface IGameService
    {
        Task<Game> AddGameAsync(string gameName, string author, int rangeMin, int rangeMax);
        Task<List<Game>> GetAllGamesAsync();
        Task<Game?> GetGameByIdAsync(int gameId);
    }
}
