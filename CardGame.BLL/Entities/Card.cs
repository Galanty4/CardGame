using System;
using System.Collections.Generic;
using System.Text;
using CardGame.BLL.Models.Dto;

namespace CardGame.BLL.Models
{
    public class Card : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Energy { get; set; }
        public int Health { get; set; }
        public int Demage { get; set; }

        public Card(CardDto card)
        {
            Id = card.Id;
            Name = card.Name;
            Description = card.Description;
            Energy = card.Energy;
            Health = card.Health;
            Demage = card.Demage;

        }

        public Card() { }
    }
}
