using System.Collections.Generic;
using System.Threading.Tasks;
using CardGame.BLL.Models.Dto;

namespace CardGame.BLL.Services.Interfaces
{
    public interface IGameService
    {
        Task<IEnumerable<GameDto>> GetAllAsync();
        Task<GameDto> GetAsync(int id);
        Task<GameDto> AddAsync(GameDto gameDto);
        Task RemoveAsync(int id);
        Task<GameDto> UpdateAsync(GameDto gameDto);
    }
}