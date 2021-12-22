using System;
using System.Collections.Generic;
using System.Text;
using CardGame.BLL.Entities;

namespace CardGame.BLL.Models.Dto
{
    public class PlayerDeckDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Energy { get; set; }
        public int Health { get; set; }
        public int DeckId { get; set; }
        public List<CardDto> Cards { get; set; }
        public PlayerDeckDto(Player player)
        {
            Id = player.Id;
            Name = player.Name;
            Energy = player.Energy;
            Health = player.Health;
            DeckId = player.DeckId;
            Cards = new List<CardDto>();
        }
        public PlayerDeckDto(Player player, DeckDto deckDto)
        {
            Id = player.Id;
            Name = player.Name;
            Energy = player.Energy;
            Health = player.Health;
            DeckId = player.DeckId;
            Cards = deckDto.Cards;
        }
        public PlayerDeckDto() { }
    }
}
