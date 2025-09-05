namespace fizzbuzz.Models
{
    public class Rule
    {
        public int RuleId { get; set; }
        public int GameId { get; set; }
        
        public int Divisor { get; set; }
        public string Replacement { get; set; } = string.Empty;
        public Game? Game { get; set; } 
    }
}
