using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardGame.BLL.Models.Dto;
using CardGame.BLL.Services.Interfaces;
using CardGame.Controllers;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CardGame.WebApi.Controllers
{
    [Route(ApiV1Route)]
    [ApiController]
    public class CardController : BaseController
    {
        private readonly ICardService _cardService;
        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CardDto>>> GetAllAsync()
        {
            var result = await _cardService.GetAllAsync();

            if (result == null)
                return NoContent();

            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<CardDto>> GetCardById([FromRoute] int id)
        {
            var result = await _cardService.GetAsync(id);

            if (result == null)
                return NoContent();

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<CardDto>> AddAsync([FromBody] CardDto entry)
        {
            var result = await _cardService.AddAsync(entry);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveCardEntryAsync(int id)
        {
            await _cardService.RemoveAsync(id);

            return Ok();
        }


    }
}
