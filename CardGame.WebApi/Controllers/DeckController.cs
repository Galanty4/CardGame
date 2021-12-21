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
    public class DeckController : BaseController
    {
        private readonly IDeckService _deckService;
        public DeckController(IDeckService deckService)
        {
            _deckService = deckService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeckDto>>> GetAllAsync()
        {
            var result = await _deckService.GetAllAsync();

            if (result == null)
                return NoContent();

            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<DeckDto>> GetDeckById([FromRoute] int id)
        {
            var result = await _deckService.GetAsync(id);

            if (result == null)
                return NoContent();

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<DeckDto>> AddAsync([FromBody] DeckDto entry)
        {
            var result = await _deckService.AddAsync(entry);

            return Ok(result);
        }
        [HttpGet("{id}/cards")]
        public async Task<ActionResult<DeckDto>> GetDeckWithCardsAsync([FromRoute] int id)
        {
            var result = await _deckService.GetDeckWithCardsAsync(id);

            if (result == null)
                return NoContent();


            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> RemoveDeckEntryAsync(int id)
        {
           var result = await _deckService.RemoveAsync(id);

            if (result == null)
                return BadRequest();

            return Ok(result);
        }
    }
}
