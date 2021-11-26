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
    public class DeckCardController : BaseController
    {
        private readonly IDeckCardService _deckCardService;
        public DeckCardController(IDeckCardService deckCardService)
        {
            _deckCardService = deckCardService;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeckCardDto>>> GetAllAsync()
        {
            var result = await _deckCardService.GetAllAsync();

            if (result == null)
                return NoContent();

            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<DeckCardDto>> GetDeckById([FromRoute] int id)
        {
            var result = await _deckCardService.GetAsync(id);

            if (result == null)
                return NoContent();

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<DeckCardDto>> AddAsync([FromBody] DeckCardDto entry)
        {
            var result = await _deckCardService.AddAsync(entry);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> RemoveDeckEntryAsync(int id)
        {
            var result = await _deckCardService.RemoveAsync(id);

            if (result == null)
                return BadRequest();

            return Ok(result);
        }
    }
}
