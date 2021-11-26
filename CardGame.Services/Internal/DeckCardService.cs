using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardGame.BLL.Entities;
using CardGame.BLL.Models.Dto;
using CardGame.BLL.Repositories;
using CardGame.BLL.Services.Interfaces;

namespace CardGame.Services.Internal
{
    public class DeckCardService : IDeckCardService
    {
        private readonly IDeckCardRepository _deckCardRepository;

        public DeckCardService(IDeckCardRepository deckCardRepository)
        {
            _deckCardRepository = deckCardRepository;
        }

        public async Task<DeckCardDto> AddAsync(DeckCardDto deckCardDto)
        {
            var deckCard = await _deckCardRepository.AddAsync(new DeckCard(deckCardDto.DeckId, deckCardDto.CardId));
            await _deckCardRepository.SaveAsync();
            return new DeckCardDto(deckCard);
        }

        public async Task<IEnumerable<DeckCardDto>> GetAllAsync()
        {
            var deckCard = await _deckCardRepository.GetAllAsync();
            return deckCard.Select(x => new DeckCardDto(x));
        }

        public async Task<DeckCardDto> GetAsync(int id)
        {
            var deckCard = await _deckCardRepository.GetAsync(id);
            return new DeckCardDto(deckCard);
        }

        public async Task<bool> RemoveAsync(int id)
        {
            var deckCard = GetAsync(id);
            if (deckCard == null)
                return false;

            await _deckCardRepository.DeleteAsync(id);
            await _deckCardRepository.SaveAsync();

            return true;
        }

        public async Task<DeckCardDto> UpdateAsync(DeckCardDto deckCardDto)
        {
            var deckCard = await _deckCardRepository.GetAsync(deckCardDto.Id);

            if (deckCard == null)
                return null;

            deckCard.DeckId = deckCardDto.DeckId;
            deckCard.CardId = deckCardDto.CardId;

            await _deckCardRepository.SaveAsync();

            return new DeckCardDto(await _deckCardRepository.GetAsync(deckCard.Id));
        }
    }
}
