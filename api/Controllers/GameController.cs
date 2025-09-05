using fizzbuzz.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace fizzbuzz.Controllers
{
    [ApiController]
    [Route("game")]
    public class GameController : ControllerBase
    {
        private readonly IGameService _gameService;
        private readonly IRuleService _ruleService;

        public GameController(IGameService gameService, IRuleService ruleService)
        {
            _gameService = gameService;
            _ruleService = ruleService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateGame([FromBody] GameCreateRequest request)
        {
            if (request.RangeMin >= request.RangeMax)
                return BadRequest("RangeMin must be less than RangeMax");
            try
            {
                var game = await _gameService.AddGameAsync(request.GameName, request.Author, request.RangeMin, request.RangeMax);

                foreach (var rule in request.Rules)
                {
                    await _ruleService.AddRuleAsync(game.GameId, rule.Divisor, rule.Replacement);
                }
                var gameWithRules = await _gameService.GetGameByIdAsync(game.GameId);

                var response = new GameResponseDto(
                    gameWithRules.GameId,
                    gameWithRules.GameName,
                    gameWithRules.Author,
                    gameWithRules.RangeMin,
                    gameWithRules.RangeMax,
                    gameWithRules.Rules.Select(r => new RuleDto(r.Divisor, r.Replacement)).ToList()
                );

                return Ok(response);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGameById(int id)
        {
            var game = await _gameService.GetGameByIdAsync(id);

            if (game == null)
                return NotFound(new { message = $"Game with ID {id} not found." });

            // Map entity -> DTO
            var response = new GameResponseDto(
                game.GameId,
                game.GameName,
                game.Author,
                game.RangeMin,
                game.RangeMax,
                game.Rules.Select(r => new RuleDto(r.Divisor, r.Replacement)).ToList()
            );

            return Ok(response);
        }


        [HttpGet]
        public async Task<IActionResult> GetAllGames()
        {
            var games = await _gameService.GetAllGamesAsync();

            var response = games.Select(g => new GameResponseDto
            (
                g.GameId,
                g.GameName,
                g.Author,
                g.RangeMin,
                g.RangeMax,
                g.Rules.Select(r => new RuleDto(r.Divisor, r.Replacement)).ToList()
            ));

            return Ok(response);
        }
    }

    // Input DTO
    public record GameCreateRequest(
        [Required] string GameName,
        [Required] string Author,
        [Range(1, 10000)] int RangeMin, // like to enforce max > min, but too much custom => check from controller funct
        [Range(1, 10000)] int RangeMax,
        [MinLength(1)] List<RuleRequest> Rules
    );

    public record RuleRequest(int Divisor, string Replacement);

    // Output DTO
    public record GameResponseDto(
        int GameId,
        string GameName,
        string Author,
        int RangeMin,
        int RangeMax,
        List<RuleDto> Rules
    );

    public record RuleDto(int Divisor, string Replacement);
}

// to do: work on the DTO like adding player name to the game session response dto
// the ids can stay for now
// also, check the controller logic, it should be fine but double-check the flow.