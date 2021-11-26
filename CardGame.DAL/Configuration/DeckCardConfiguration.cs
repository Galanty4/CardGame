using CardGame.BLL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CardGame.DAL.Configuration
{
    class DeckCardConfiguration : IEntityTypeConfiguration<DeckCard>
    {
        public void Configure(EntityTypeBuilder<DeckCard> builder)
        {
            builder
                .ToTable(nameof(DeckCard))
                .HasKey(entity => new { entity.DeckId, entity.CardId });
            builder
                .HasOne(entity => entity.Deck)
                .WithMany(deck => deck.DeckCard)
                .HasForeignKey(entity => entity.DeckId);
            builder
                .HasOne(entity => entity.Card)
                .WithMany(deck => deck.DeckCard)
                .HasForeignKey(entity => entity.CardId);
        }
    }
}
