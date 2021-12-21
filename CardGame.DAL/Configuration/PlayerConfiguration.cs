using CardGame.BLL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CardGame.DAL.Configuration
{
    public class PlayerConfiguration : IEntityTypeConfiguration<Player>
    {
        public void Configure(EntityTypeBuilder<Player> builder)
        {
            builder
                .ToTable(nameof(Player))
                .HasKey(entity => entity.Id);
            builder
                .HasIndex(entity => entity.Name).IsUnique();
            builder
                .HasOne(entity => entity.DeckCard)
                .WithMany(deck => deck.Player)
                .HasForeignKey(entity => entity.DeckId);
        }
    }
}
