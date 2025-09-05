using fizzbuzz.Models;

namespace fizzbuzz.Interfaces
{
    public interface IAnswerService
    {
        Task<Answer> UpdateAnswerAsync(int answerId, string response);
        Task<Answer> AddAnswerAsync(int gameSessionId, int number);


    }
}
