using CardGame.BLL.Entities;

namespace CardGame.BLL.Models.Dto
{
    public class GameDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int PlayerIdRound { get; set; }
        public int Round { get; set; }
        public int HostPlayerId { get; set; }
        public int GuestPlayerId { get; set; }

        public GameDto(Game game)
        {
            Id = game.Id;
            Name = game.Name;
            PlayerIdRound = game.PlayerIdRound;
            Round = game.Round;
            HostPlayerId = game.HostPlayerId;
            GuestPlayerId = game.GuestPlayerId;
        }
        public GameDto() { }
    }
}
