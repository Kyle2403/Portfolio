using fizzbuzz.Data;
using fizzbuzz.Models;
using fizzbuzz.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace fizzbuzz.Services
{
    public class PlayerService: IPlayerService
    {
        private readonly AppDbContext dbContext;
        public PlayerService(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // same here, player can be added without any game sessions, as it is a parent-child relationship
        public async Task<Player> AddPlayerAsync(string username)
        {
            // Check if the player already exists
            var existingPlayer = await dbContext.Players.FirstOrDefaultAsync(p => p.Username == username);
            // If the player already exists, throw an exception
            if (existingPlayer != null)
            {
                return existingPlayer;
            }
            // If the player does not exist, create a new player
            var player = new Player
            {
                Username = username
            };
            dbContext.Players.Add(player);
            await dbContext.SaveChangesAsync();
            return player;
        }
        // i dont even remember why i wrote this, but it is not needed in the controller endpoints, and since we can just use the FindAsync method
        // ah, the auto complete feature of vs added this, i guess
        public async Task<Player?> GetPlayerByIdAsync(int playerId)
        {
            return await dbContext.Players.FindAsync(playerId);
        }
        // for lookup function, we dont need to raise exceptions, just return null if not found
        // for create or update or delete, we need to raise exceptions if not found
        //The idea is: operations that change state should enforce business rules and fail loudly when they can’t proceed.
        // Lookups usually return null or empty results instead of exceptions.
    }
}
