using System.Collections.Generic;
using CardGame.BLL.Entities;

namespace CardGame.BLL.Models.Dto
{
    public class DeckCardDto
    {
        public int Id { get; set; }
        public int DeckId { get; set; }
        public int CardId { get; set; }
        public DeckCardDto() { }

        public DeckCardDto(DeckCard deckCard)
        {
            Id = deckCard.Id;
            DeckId = deckCard.DeckId;
            CardId = deckCard.CardId;

        }
    }
}
