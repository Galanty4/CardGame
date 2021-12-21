using CardGame.BLL.Models;
using CardGame.BLL.Models.Dto;

namespace CardGame.BLL.Entities
{
    public class Game : BaseEntity
    {
        public string Name { get; set; }
        public int PlayerIdRound { get; set; }
        public int Round { get; set; }
        public int HostPlayerId { get; set; }
        public int GuestPlayerId { get; set; }
        public Player HostPlayer { get; set; }
        public Player GuestPlayer { get; set; }

        public Game(GameDto gameDto)
        {
            Id = gameDto.Id;
            Name = gameDto.Name;
            PlayerIdRound = gameDto.PlayerIdRound;
            Round = gameDto.Round;
            HostPlayerId = gameDto.HostPlayerId;
            GuestPlayerId = gameDto.GuestPlayerId;
        }

        public Game() { }
    }
}
