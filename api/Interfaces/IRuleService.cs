using fizzbuzz.Models;

namespace fizzbuzz.Interfaces
{
    public interface IRuleService
    {
        Task<Rule> AddRuleAsync(int gameId, int divisor, string replacement);
    }
}
