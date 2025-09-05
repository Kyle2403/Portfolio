namespace fizzbuzz.Models
{
    public class Player
    {
        public int PlayerId { get; set; }
        public string Username { get; set; } = string.Empty;
        
        public ICollection<GameSession> GameSessions { get; set; } = new List<GameSession>();
    }

}

