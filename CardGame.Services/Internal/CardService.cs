
using System.Collections.Generic;
using System.Threading.Tasks;
using CardGame.BLL.Models.Dto;
using CardGame.BLL.Services.Interfaces;
using CardGame.BLL.Repositories;
using CardGame.BLL.Models;
using System.Linq;

namespace CardGame.Services.Internal
{
    public class CardService : ICardService
    {
        private readonly ICardRepository _cardRepository;

        public CardService(ICardRepository cardRepository)
        {
            _cardRepository = cardRepository;
        }
        public async Task<CardDto> AddAsync(CardDto cardDto)
        {
            var cardEntry = await _cardRepository.AddAsync(new Card(cardDto));
            await _cardRepository.SaveAsync();
            return new CardDto(cardEntry);
        }

        public async Task<IEnumerable<CardDto>> GetAllAsync()
        {
            var cardEntries = await _cardRepository.GetAllAsync();
            return cardEntries.Select(x => new CardDto(x));
        }

        public async Task<CardDto> GetAsync(int id)
        {
            var card = await _cardRepository.GetAsync(id);
            return new CardDto(card);
        }
        public async Task RemoveAsync(int id)
        {
            await _cardRepository.DeleteAsync(id);
            await _cardRepository.SaveAsync();
        }

        public async Task<CardDto> UpdateAsync(CardDto updatedCard)
        {
            var foundCardEntry = await _cardRepository.GetAsync(updatedCard.Id);
            /*
                        if (foundCardEntry == null)
                            //exception*/
            foundCardEntry.Name = updatedCard.Name;
            foundCardEntry.Description = updatedCard.Description;
            foundCardEntry.Energy = updatedCard.Energy;
            foundCardEntry.Health = updatedCard.Health;
            foundCardEntry.Demage = updatedCard.Demage;

            await _cardRepository.SaveAsync();

            return new CardDto(await _cardRepository.GetAsync(foundCardEntry.Id));
        }
    }
}
