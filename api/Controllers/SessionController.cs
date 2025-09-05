using fizzbuzz.Interfaces;
using fizzbuzz.Models;
using fizzbuzz.Services;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace fizzbuzz.Controllers
{
    [ApiController]
    [Route("session")]
    public class SessionController : ControllerBase
    {
        private readonly ISessionService _sessionService;
        private readonly IAnswerService _answerService;

        public SessionController(ISessionService sessionService, IAnswerService answerService)
        {
            _sessionService = sessionService;
            _answerService = answerService;
        }

        [HttpPost]
        public async Task<IActionResult> StartGameSession([FromBody] GameSessionCreateRequest request)
        {
            try
            {
                var session = await _sessionService.AddGameSessionAsync(request.PlayerId, request.GameId, request.Duration);
                var response = new GameSessionResponseDto(
                    session.GameSessionId,
                    session.GameId,
                    session.Game.GameName,
                    session.PlayerId,
                    session.Player.Username,
                    session.Duration,
                    session.StartTime,
                    session.EndTime,
                    session.ScoreCorrect,
                    session.ScoreIncorrect,
                    session.IsDone,
                    session.Answers.Select(a => new AnswerDto(
                        a.AnswerId,
                        a.GameSessionId,
                        a.Number,
                        a.Response,
                        a.CorrectResponse,
                        a.IsCorrect
                    )).ToArray()
                );
                return Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message }); // 404 if player or game not found
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message, stackTrace = ex.StackTrace,
        innerException = ex.InnerException?.Message });
            }
        }

        [HttpPost("{id}/random")]
        public async Task<IActionResult> GenerateRandomNumber(int id)
        {
            try
            {
                var number = await _sessionService.GenerateRandomNumber(id);
                var answer = await _answerService.AddAnswerAsync(id, number);
                return Ok(new
                {
                    Number = number,
                    answer.AnswerId
                });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message }); // 404 if session not found
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message }); // 400 if session ended or number already used
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> EndGameSession(int id)
        {
            try
            {
                var session = await _sessionService.EndGameSessionAsync(id);

                var response = new GameSessionResponseDto(
                    session.GameSessionId,
                    session.GameId,
                    session.Game.GameName,
                    session.PlayerId,
                    session.Player.Username,
                    session.Duration,
                    session.StartTime,
                    session.EndTime,
                    session.ScoreCorrect,
                    session.ScoreIncorrect,
                    session.IsDone,
                    session.Answers.Select(a => new AnswerDto(
                        a.AnswerId,
                        a.GameSessionId,
                        a.Number,
                        a.Response,
                        a.CorrectResponse,
                        a.IsCorrect
                    )).ToArray()
                );
                return Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message }); // 404 if session not found
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGameSession(int id)
        {
            var session = await _sessionService.GetGameSessionByIdAsync(id);
            if (session == null) return NotFound();

            var response = new GameSessionResponseDto(
                session.GameSessionId,
                session.GameId,
                session.Game.GameName,
                session.PlayerId,
                session.Player.Username,
                session.Duration,
                session.StartTime,
                session.EndTime,
                session.ScoreCorrect,
                session.ScoreIncorrect,
                session.IsDone,
                session.Answers.Select(a => new AnswerDto(
                    a.AnswerId,
                    a.GameSessionId,
                    a.Number,
                    a.Response,
                    a.CorrectResponse,
                    a.IsCorrect
                )).ToArray()
            );

            var answerDtos = session.Answers.Select(a => new AnswerDto(
                a.AnswerId,
                a.GameSessionId,
                a.Number,
                a.Response,
                a.CorrectResponse,
                a.IsCorrect
            )).ToList();

            //return Ok(answerDtos);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSessions()
        {
            var sessions = await _sessionService.GetAllGameSessionsAsync();
            var response = sessions.Select(s => new GameSessionResponseDto(
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
    public record GameSessionCreateRequest(
        [Required] int GameId,
        [Required] int PlayerId,
        [Range(10, 3600)] int Duration // seconds
    );
    
    public record AnswerDto(
        int AnswerId,
        int GameSessionId,
        int Number,
        string Response,
        string CorrectResponse,
        bool IsCorrect
    );
}
