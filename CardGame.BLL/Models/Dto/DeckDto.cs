using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CardGame.BLL.Entities;

namespace CardGame.BLL.Models.Dto
{
    public class DeckDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<CardDto> Cards { get; set; }

        public DeckDto() { }

        public DeckDto(Deck deck)
        {
            Id = deck.Id;
            Name = deck.Name;
            Cards = new List<CardDto>();
        }
    }
}
