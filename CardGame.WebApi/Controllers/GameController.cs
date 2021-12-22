using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardGame.BLL.Models.Dto;
using CardGame.BLL.Services.Interfaces;
using CardGame.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace CardGame.WebApi.Controllers
{
    [Route(ApiV1Route)]
    [ApiController]
    public class GameController : BaseController
    {
        private readonly IGameService _gameService;
        public GameController(IGameService gameService)
        {
            _gameService = gameService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameDto>>> GetAllAsync()
        {
            var result = await _gameService.GetAllAsync();

            if (result == null)
                return NoContent();

            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<GameDto>> GetGameById([FromRoute] int id)
        {
            var result = await _gameService.GetAsync(id);

            if (result == null)
                return NoContent();

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<GameDto>> AddAsync([FromBody] GameDto entry)
        {
            var result = await _gameService.AddAsync(entry);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveGameEntryAsync(int id)
        {
            await _gameService.RemoveAsync(id);

            return Ok();
        }
    }
}
