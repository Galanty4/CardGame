using CardGame.BLL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CardGame.DAL.Configuration
{
    public class GameConfiguration : IEntityTypeConfiguration<Game>
    {
        public void Configure(EntityTypeBuilder<Game> builder)
        {
            builder
               .Ignore(entity => entity.GuestPlayer);
            builder
                .HasOne(entity => entity.HostPlayer)
                .WithMany(deck => deck.Game)
                .HasForeignKey(entity => entity.HostPlayerId)
                .HasPrincipalKey(player => player.Id);
            builder
                .HasOne(entity => entity.GuestPlayer)
                .WithMany(deck => deck.Game)
                .HasForeignKey(entity => entity.GuestPlayerId).OnDelete(DeleteBehavior.NoAction)
                .HasPrincipalKey(player => player.Id);
        }
    }
}
