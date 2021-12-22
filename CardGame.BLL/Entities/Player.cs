using System.Collections.Generic;
using CardGame.BLL.Models;
using CardGame.BLL.Models.Dto;

namespace CardGame.BLL.Entities
{
    public class Player : BaseEntity
    {
        public string Name { get; set; }
        public int Energy { get; set; }
        public int Health { get; set; }
        public int DeckId { get; set; }
        public DeckCard DeckCard { get; set; }
        public ICollection<Game> Game { get; set; }
        public ICollection<Game> GameEnemy { get; set; }

        public Player(PlayerDto playerDto)
        {
            Id = playerDto.Id;
            Name = playerDto.Name;
            Energy = playerDto.Energy;
            Health = playerDto.Health;
            DeckId = playerDto.DeckId;
        }

        public Player() { }
    }
}
