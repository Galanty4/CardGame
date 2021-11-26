using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardGame.BLL.Entities;
using CardGame.BLL.Models;
using CardGame.BLL.Models.Dto;
using CardGame.BLL.Repositories;
using CardGame.BLL.Services.Interfaces;

namespace CardGame.Services.Internal
{
    public class DeckService : IDeckService
    {
        private readonly IDeckRepository _deckRepository;
        private readonly ICardRepository _cardRepository;
        private readonly IDeckCardRepository _deckCardRepository;

        public DeckService(IDeckRepository deckRepository, ICardRepository cardRepository, IDeckCardRepository deckCardRepository)
        {
            _deckRepository = deckRepository;
            _cardRepository = cardRepository;
            _deckCardRepository = deckCardRepository;
        }

        public async Task<DeckDto> AddAsync(DeckDto deckDto)
        {
            var deck = await _deckRepository.AddAsync(new Deck(deckDto));
            await _deckRepository.SaveAsync();
            return new DeckDto(deck);
        }

        public async Task<IEnumerable<DeckDto>> GetAllAsync()
        {
            var decks = await _deckRepository.GetAllAsync();
            return decks.Select(x => new DeckDto(x));
        }

        public async Task<DeckDto> GetAsync(int id)
        {
            var deck = await _deckRepository.GetAsync(id);
            return new DeckDto(deck);
        }

        public async Task<DeckDto> GetDeckWithCardsAsync(int id)
        {
            var deck = await _deckRepository.GetAsync(id);
            if (deck == null)
                return null;

            var deckIncludeCards = new DeckDto(deck);

            var cards = await _deckCardRepository.GetByDeckIdIncludeCards(deck.Id);

            foreach(var card in cards)
            {
                deckIncludeCards.Cards.Add(new CardDto(card.Card));
            }

            return deckIncludeCards;
        }

        public async Task<bool> RemoveAsync(int id)
        {
            var deck = GetAsync(id);
            if(deck == null)
                return false;

            await _deckRepository.DeleteAsync(id);
            await _deckRepository.SaveAsync();

            return true;
        }

        public async Task<DeckDto> UpdateAsync(DeckDto deckDto)
        {
            var deck = await _deckRepository.GetAsync(deckDto.Id);

            if (deck == null)
                return null;

            deck.Name = deckDto.Name;

            await _deckRepository.SaveAsync();

            return new DeckDto(await _deckRepository.GetAsync(deck.Id));
        }
    }
}
