using fizzbuzz.Data;
using fizzbuzz.Models;
using fizzbuzz.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace fizzbuzz.Services
{
    public class RuleService: IRuleService
    {
        private readonly AppDbContext dbContext;
        public RuleService(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // cann check if game exists or not, since it is a foreign key constraint
        // if the game does not exist, it will throw an exception when trying to add the rule
        // but ithink it is better to check if the game exists before adding the rule
        // allowing better error messages

        // also check if the same rule already exists for the game
        public async Task<Rule> AddRuleAsync(int gameId, int divisor, string replacement)
        {
            // Check if the game exists
            var gameExists = await dbContext.Games.AnyAsync(g => g.GameId == gameId);
            if (!gameExists)
            {
                throw new KeyNotFoundException($"Game with ID {gameId} not found.");
            }

            // Check if the rule already exists for the game
            // still nneeds to define what means exist here,
            // so the existing check needs work, and also need to add  the unique constraint in the database, same for answers and games 
            var existingDivisor = await dbContext.Rules
                .FirstOrDefaultAsync(r => r.GameId == gameId && r.Divisor == divisor);

            // If the rule already exists, throw an exception
            if (existingDivisor != null)
            {
                throw new InvalidOperationException($"A rule with divisor {divisor} already exists for game ID {gameId}.");
            }

            var existingReplacement = await dbContext.Rules
                .FirstOrDefaultAsync(r => r.GameId == gameId && r.Replacement == replacement);

            if (existingReplacement != null)
            {
                throw new InvalidOperationException($"A rule with replacement {replacement} already exists for game ID {gameId}.");
            }

            // If the rule does not exist, create a new rule
            var rule = new Rule
            {
                GameId = gameId,
                Divisor = divisor,
                Replacement = replacement
            };
            // Add the rule to the database
            dbContext.Rules.Add(rule);
            await dbContext.SaveChangesAsync();
            return rule;
        }
    }

    // so for a parent, check if it exists before adding a new row
    // for a child, check if the parent exists and if a same row exists before adding a new row, even though there may be already a FK and unique constraint in the database
    // same rows can be allowed depending on the business logic, 
}
