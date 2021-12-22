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
               .ToTable(nameof(Game))
                .HasKey(game => game.Id);
            builder
                .HasOne(game => game.HostPlayer)
                .WithMany(player => player.Game)
                .HasForeignKey(entity => entity.HostPlayerId)
                .OnDelete(DeleteBehavior.NoAction);
            builder
                .HasOne(game => game.GuestPlayer)
                .WithMany(player => player.GameEnemy)
                .HasForeignKey(entity => entity.GuestPlayerId)
                .OnDelete(DeleteBehavior.NoAction); ;
        }
    }
}
