using System.Globalization;

namespace fizzbuzz.Models
{
    public class Game
    {
        public int GameId { get; set; }
        public string GameName { get; set; } = string.Empty;
        
        public string Author { get; set; } = string.Empty;
        public int RangeMin { get; set; }
        public int RangeMax { get; set; }
        
        public ICollection<Rule> Rules { get; set; } = new List<Rule>();
        public ICollection<GameSession> GameSessions { get; set; } = new List<GameSession>();


    }
}
