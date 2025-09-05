using fizzbuzz.Data;
using Microsoft.EntityFrameworkCore;
using fizzbuzz.Models;
using fizzbuzz.Interfaces;
namespace fizzbuzz.Services
{
    public class AnswerService: IAnswerService
    {
        private readonly AppDbContext dbContext;
        public AnswerService(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Answer> UpdateAnswerAsync(int answerId, string response)
        {
            var answer = await dbContext.Answers
                .Include(a => a.GameSession) // ensure GameSession is loaded
                .FirstOrDefaultAsync(a => a.AnswerId == answerId);
            

            if (answer == null)
                throw new KeyNotFoundException($"Answer with ID {answerId} not found.");
            if (answer.GameSession == null)
                throw new InvalidOperationException("Associated GameSession is missing.");

            if (DateTime.UtcNow > answer.GameSession.EndTime)
            {
                throw new InvalidOperationException("The game session has ended. You cannot update this answer.");
            }
            answer.Response = response;
            
            var rules = await dbContext.Rules
                .Where(r => r.GameId == answer.GameSession.GameId)
                .ToListAsync();

            var expectedResponse = rules
                .Where(r => answer.Number % r.Divisor == 0)
                .OrderBy(r => r.Divisor) // optional for consistent order
                .Select(r => r.Replacement)
                .Aggregate("", (acc, next) => acc + next);

            if (string.IsNullOrEmpty(expectedResponse))
                expectedResponse = answer.Number.ToString();
            answer.IsCorrect = string.Equals(answer.Response, expectedResponse, StringComparison.OrdinalIgnoreCase);
            answer.CorrectResponse = expectedResponse;
            //dbContext.Answers.Update(answer);
            await dbContext.SaveChangesAsync();
            return answer;
        }

        // if only A calls B, B can skip error checking, and just assume A has already checked it
        // Both B and A can check it itself
        // or only B checks it, and A assumes B has checked it
        // in this case, B is the service, and A is the controller
        // we can skip the check here, thanks to the foreign key constraint in the database
        // i think checking here is better, since it makes the controller cleaner, and we can provide better error messages
        public async Task<Answer> AddAnswerAsync(int gameSessionId, int number)
        {
            // Check if the GameSession exists
            var session = await dbContext.GameSessions
                   .FirstOrDefaultAsync(s => s.GameSessionId == gameSessionId);
            // if the session does not exist, throw an exception
            if (session == null)
            {
                throw new KeyNotFoundException($"GameSession with ID {gameSessionId} not found.");
            }
            // Check if the session has ended
            if (DateTime.UtcNow > session.EndTime || session.IsDone)
                throw new InvalidOperationException("The game session has ended. No new answers allowed.");

            // i am not sure if we need to check if the number already exists or not
            // i can not allow same number for the same session,which
            // forces me to both enforce uniqueness in the database, and the number generator
            // and also do the manual check here
            var existingAnswer = await dbContext.Answers
                .FirstOrDefaultAsync(a => a.GameSessionId == gameSessionId && a.Number == number);
            // if the answer already exists, throw an exception
            if (existingAnswer != null)
            {
                throw new InvalidOperationException($"{number} is already used in an answer for GameSession ID {gameSessionId}.");
            }
            // if the answer does not exist, create a new answer
            var answer = new Answer
            {
                GameSessionId = gameSessionId,
                Number = number,
            };
            dbContext.Answers.Add(answer);
            await dbContext.SaveChangesAsync();
            return answer;
        }

        // return either the answer object or just id, but lets jusst let the
        // controller decide what to return.


    }
}
