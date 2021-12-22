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
                .HasKey(player => player.Id);
            builder
                .HasOne(player => player.DeckCard)
                .WithMany(deckCard => deckCard.Player)
                .HasForeignKey(player => player.DeckId)
                .HasPrincipalKey(deckCard => deckCard.Id);
        }
    }
}
