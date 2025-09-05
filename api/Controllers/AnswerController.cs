using fizzbuzz.Interfaces;
using fizzbuzz.Models;
using fizzbuzz.Services;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace fizzbuzz.Controllers
{
    [ApiController]
    [Route("answer")]
    public class AnswerController : ControllerBase
    {
        private readonly IAnswerService _answerService;

        public AnswerController(IAnswerService answerService)
        {
            _answerService = answerService;
        }

        //[HttpPost]
        //public async Task<IActionResult> AddAnswer([FromBody] AnswerCreateRequest request)
        //{
        //    try
        //    {
        //        var answer = await _answerService.AddAnswerAsync(request.GameSessionId, request.Number);
        //        return Ok(new { answer.AnswerId });
        //    }
        //    catch (KeyNotFoundException ex)
        //    {
        //        return NotFound(new { message = ex.Message });
        //    }
        //    catch (InvalidOperationException ex)
        //    {
        //        return BadRequest(new { message = ex.Message });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
        //    }

        //}

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateAnswer(int id, [FromBody] AnswerUpdateRequest request)
        {
            try
            {
                var answer = await _answerService.UpdateAnswerAsync(id, request.Response);
                var response = new AnswerResponseDto(answer.AnswerId, answer.GameSessionId, answer.Number, answer.Response, answer.IsCorrect);
                return Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }

        }
    }

    // Input DTOs
    public record AnswerCreateRequest([Required] int GameSessionId, [Required] int Number);
    public record AnswerUpdateRequest([Required] string Response);

    // Output DTO
    public record AnswerResponseDto(int AnswerId, int GameSessionId, int Number, string Response, bool IsCorrect);
}
