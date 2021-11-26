using System.Collections.Generic;
using System.Threading.Tasks;
using CardGame.BLL.Models.Dto;

namespace CardGame.BLL.Services.Interfaces
{
    public interface IDeckService
    {
        Task<IEnumerable<DeckDto>> GetAllAsync();
        Task<DeckDto> GetAsync(int id);
        Task<DeckDto> AddAsync(DeckDto deckDto);
        Task<bool> RemoveAsync(int id);
        Task<DeckDto> UpdateAsync(DeckDto deckDto);
        Task<DeckDto> GetDeckWithCardsAsync(int id);
    }
}
