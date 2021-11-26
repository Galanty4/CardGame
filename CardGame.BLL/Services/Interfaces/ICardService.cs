using System.Collections.Generic;
using System.Threading.Tasks;
using CardGame.BLL.Models.Dto;

namespace CardGame.BLL.Services.Interfaces
{
    public interface ICardService
    {
        Task<IEnumerable<CardDto>> GetAllAsync();
        Task<CardDto> GetAsync(int id);
        Task<CardDto> AddAsync(CardDto cardDto);
        Task RemoveAsync(int id);
        Task<CardDto> UpdateAsync(CardDto cardDto);
    }
}
