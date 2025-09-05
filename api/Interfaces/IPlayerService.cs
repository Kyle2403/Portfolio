using fizzbuzz.Models;

namespace fizzbuzz.Interfaces
{
    public interface IPlayerService
    {
        Task<Player> AddPlayerAsync(string username);
    }
}
