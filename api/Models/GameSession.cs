namespace fizzbuzz.Models
{
    public class GameSession
    {
        public int GameSessionId { get; set; }
        public int GameId { get; set; }
        public int PlayerId { get; set; }
        
        public int Duration { get; set; } 
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        
        public int ScoreCorrect { get; set; }
        public int ScoreIncorrect { get; set; }

        public bool IsDone { get; set; } = false; 
        public Game Game { get; set; } = null!;
        public Player? Player { get; set; }
        public ICollection<Answer> Answers { get; set; } = new List<Answer>();
    }
}
