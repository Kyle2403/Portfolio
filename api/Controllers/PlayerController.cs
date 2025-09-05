using fizzbuzz.Interfaces;
using fizzbuzz.Models;
using fizzbuzz.Services;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace fizzbuzz.Controllers
{
    [ApiController]
    [Route("player")]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerService _playerService;
        private readonly ISessionService _sessionService;

        public PlayerController(IPlayerService playerService, ISessionService sessionService)
        {
            _playerService = playerService;
            _sessionService = sessionService;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePlayer([FromBody] PlayerCreateRequest request)
        {
            try
            {
                var player = await _playerService.AddPlayerAsync(request.Username);
                var response = new PlayerResponseDto
                (
                    player.PlayerId,
                    player.Username
                );

                return Ok(response);
            }
            catch (InvalidOperationException ex) // catch the specific error from your service
            {
                return Conflict(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // fallback for any other unhandled exceptions
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlayerSessions(int id)
        {
            var sessions = await _sessionService.GetAllGameSessionsByPlayerAsync(id);

            var response = sessions.Select(s => new GameSessionResponseDto
            (
                s.GameSessionId,
                s.GameId,
                s.Game.GameName,
                s.PlayerId,
                s.Player.Username,
                s.Duration,
                s.StartTime,
                s.EndTime,
                s.ScoreCorrect,
                s.ScoreIncorrect,
                s.IsDone,
                s.Answers.Select(a => new AnswerDto(
                    a.AnswerId,
                    a.GameSessionId,
                    a.Number,
                    a.Response,
                    a.CorrectResponse,
                    a.IsCorrect
                )).ToArray()
            ));

            return Ok(response);
        }
    }

    // Input DTO
    public record PlayerCreateRequest([Required] string Username);

    // Output DTO
    public record GameSessionResponseDto(
        int GameSessionId,
        int GameId,
        string GameName,
        int PlayerId,
        string PlayerName,
        int Duration,
        DateTime StartTime,
        DateTime? EndTime,
        int ScoreCorrect,
        int ScoreIncorrect,
        bool IsDone,
        AnswerDto[] Answers
    );

    public record PlayerResponseDto
    (
        int PlayerId,
        string Username
    );
}
