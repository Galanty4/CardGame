using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CardGame.BLL.Models.Dto;

namespace CardGame.BLL.Services.Interfaces
{
    public interface IDeckCardService
    {
        Task<IEnumerable<DeckCardDto>> GetAllAsync();
        Task<DeckCardDto> GetAsync(int id);
        Task<DeckCardDto> AddAsync(DeckCardDto deckCardDto);
        Task<bool> RemoveAsync(int id);
        Task<DeckCardDto> UpdateAsync(DeckCardDto deckCardDto);
    }
}
