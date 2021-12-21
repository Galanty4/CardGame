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
    public class GameService : IGameService
    {
        private readonly IGameRepository _gameRepository;

        public GameService(IGameRepository gameRepository)
        {
            _gameRepository = gameRepository;
        }
        public async Task<GameDto> AddAsync(GameDto gameDto)
        {
            var cardEntry = await _gameRepository.AddAsync(new Game(gameDto));
            await _gameRepository.SaveAsync();
            return new GameDto(cardEntry);
        }

        public async Task<IEnumerable<GameDto>> GetAllAsync()
        {
            var GameEntries = await _gameRepository.GetAllAsync();
            return GameEntries.Select(x => new GameDto(x));
        }

        public async Task<GameDto> GetAsync(int id)
        {
            var game = await _gameRepository.GetAsync(id);
            return new GameDto(game);
        }

        public async Task RemoveAsync(int id)
        {
            await _gameRepository.DeleteAsync(id);
            await _gameRepository.SaveAsync();
        }

        public async Task<GameDto> UpdateAsync(GameDto gameDto)
        {
            var foundGameEntry = await _gameRepository.GetAsync(gameDto.Id);

            foundGameEntry.Name = gameDto.Name;
            foundGameEntry.PlayerIdRound = gameDto.PlayerIdRound;
            foundGameEntry.Round = gameDto.Round;

            await _gameRepository.SaveAsync();

            return new GameDto(await _gameRepository.GetAsync(foundGameEntry.Id));
        }
    }
}
