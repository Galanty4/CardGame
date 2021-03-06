using System;
using System.Collections.Generic;
using System.Text;
using CardGame.BLL.Models;

namespace CardGame.BLL.Entities
{
    public class DeckCard : BaseEntity
    {
        public int DeckId { get; set; }
        public Deck Deck { get; set; }
        public int CardId { get; set; }
        public Card Card { get; set; }

        public DeckCard(int deckId, int cardId)
        {
            DeckId = deckId;
            CardId = cardId;
        }

        public DeckCard() { }
    }
}
