using System;
using System.Collections.Generic;
using System.Text;

namespace CardGame.BLL.Models.Dto
{
    public class CardDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Energy { get; set; }
        public int Health { get; set; }
        public int Demage { get; set; }
        public CardDto(Card card)
        {
            Id = card.Id;
            Name = card.Name;
            Description = card.Description;
            Energy = card.Energy;
            Health = card.Health;
            Demage = card.Demage;

        }
        public CardDto() { }
    }
}
