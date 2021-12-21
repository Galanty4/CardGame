using System.Collections.Generic;
using CardGame.BLL.Models;
using CardGame.BLL.Models.Dto;

namespace CardGame.BLL.Entities
{
    public class Deck : BaseEntity
    {
        public string Name { get; set; }
        public ICollection<DeckCard> DeckCard { get; set; }

        public Deck()
        {
        }
        public Deck(DeckDto deckDto)
        {
            Id = deckDto.Id;
            Name = deckDto.Name;
        }
    }
}
