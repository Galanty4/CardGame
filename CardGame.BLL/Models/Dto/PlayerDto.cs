using CardGame.BLL.Entities;

namespace CardGame.BLL.Models.Dto
{
    public class PlayerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Energy { get; set; }
        public int Health { get; set; }
        public int DeckId { get; set; }
        public PlayerDto(Player player)
        {
            Id = player.Id;
            Name = player.Name;
            Energy = player.Energy;
            Health = player.Health;
            DeckId = player.DeckId;
        }
        public PlayerDto() { }
    }
}
