using System.Collections.Generic;
using System.Threading.Tasks;
using CardGame.BLL.Models.Dto;
using CardGame.BLL.Services.Interfaces;
using CardGame.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace CardGame.WebApi.Controllers
{
    [Route(ApiV1Route)]
    [ApiController]
    public class PlayerController : BaseController
    {
        private readonly IPlayerService _playerService;
        public PlayerController(IPlayerService playerService)
        {
            _playerService = playerService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlayerDto>>> GetAllAsync()
        {
            var result = await _playerService.GetAllAsync();

            if (result == null)
                return NoContent();

            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<PlayerDto>> GetPlayerById([FromRoute] int id)
        {
            var result = await _playerService.GetAsync(id);

            if (result == null)
                return NoContent();

            return Ok(result);
        }
        [HttpGet("game/{id}")]
        public async Task<ActionResult<IEnumerable<PlayerDto>>> GetPlayersByGameIdAsync([FromRoute] int id)
        {
            var result = await _playerService.GetPlayersByGameIdAsync(id);

            if (result == null)
                return NoContent();

            return Ok(result);
        }
        [HttpGet("game-with-deck/{id}")]
        public async Task<ActionResult<IEnumerable<PlayerDto>>> GetPlayersWithDeckByGameIdAsync([FromRoute] int id)
        {
            var result = await _playerService.GetPlayersWithDeckByGameIdAsync(id);

            if (result == null)
                return NoContent();

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<PlayerDto>> AddAsync([FromBody] PlayerDto entry)
        {
            var result = await _playerService.AddAsync(entry);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemovePlayerEntryAsync(int id)
        {
            await _playerService.RemoveAsync(id);

            return Ok();
        }
    }
}
