using System;
using System.Collections.Generic;
using System.Text;
using CardGame.BLL.Entities;
using CardGame.BLL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CardGame.DAL.Configuration
{ 
    public class CardConfiguration : IEntityTypeConfiguration<Card>
    {
        public void Configure(EntityTypeBuilder<Card> builder)
        {
            builder
                .ToTable(nameof(Card))
                .HasKey(entity => entity.Id);
        }
    }
}
