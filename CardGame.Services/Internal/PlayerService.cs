using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardGame.BLL.Entities;
using CardGame.BLL.Models.Dto;
using CardGame.BLL.Repositories;
using CardGame.BLL.Services.Interfaces;

namespace CardGame.Services.Internal
{
    public class PlayerService : IPlayerService
    {
        private readonly IPlayerRepository _playerRepository;

        public PlayerService(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }
        public async Task<PlayerDto> AddAsync(PlayerDto playerDto)
        {
            var playerEntry = await _playerRepository.AddAsync(new Player(playerDto));
            await _playerRepository.SaveAsync();
            return new PlayerDto(playerEntry);
        }

        public async Task<IEnumerable<PlayerDto>> GetAllAsync()
        {
            var playerEntry = await _playerRepository.GetAllAsync();
            return playerEntry.Select(x => new PlayerDto(x));
        }

        public async Task<PlayerDto> GetAsync(int id)
        {
            var player = await _playerRepository.GetAsync(id);
            return new PlayerDto(player);
        }

        public async Task RemoveAsync(int id)
        {
            await _playerRepository.DeleteAsync(id);
            await _playerRepository.SaveAsync();
        }

        public async Task<PlayerDto> UpdateAsync(PlayerDto playerDto)
        {
            var foundPlayerEntry = await _playerRepository.GetAsync(playerDto.Id);

            foundPlayerEntry.Name = playerDto.Name;
            foundPlayerEntry.Energy = playerDto.Energy;
            foundPlayerEntry.Health = playerDto.Health;
            foundPlayerEntry.DeckId = playerDto.DeckId;

            await _playerRepository.SaveAsync();

            return new PlayerDto(await _playerRepository.GetAsync(foundPlayerEntry.Id));
        }
    }
}
