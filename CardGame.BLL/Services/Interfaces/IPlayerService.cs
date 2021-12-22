using System.Collections.Generic;
using System.Threading.Tasks;
using CardGame.BLL.Models.Dto;

namespace CardGame.BLL.Services.Interfaces
{
    public interface IPlayerService
    {
        Task<IEnumerable<PlayerDto>> GetAllAsync();
        Task<PlayerDto> GetAsync(int id);
        Task<IEnumerable<PlayerDto>> GetPlayersByGameIdAsync(int id);
        Task<IEnumerable<PlayerDeckDto>> GetPlayersWithDeckByGameIdAsync(int id);
        Task<PlayerDto> AddAsync(PlayerDto playerDto);
        Task RemoveAsync(int id);
        Task<PlayerDto> UpdateAsync(PlayerDto playerDto);
    }
}
