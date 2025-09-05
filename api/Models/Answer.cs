
namespace fizzbuzz.Models
{
    public class Answer
    {
        // child has parent FK
        // both parent and child have navigation properties
        public int AnswerId { get; set; }
        public int GameSessionId { get; set; }
        public int Number { get; set; }
        public string Response { get; set; } = string.Empty;
        public string CorrectResponse { get; set; } = string.Empty;

        public bool IsCorrect { get; set; } = false;

        public GameSession GameSession { get; set; } = null!;


    }
}
