using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using CardGame.BLL.Models;
using CardGame.BLL.Services.Internal;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using CardGame.BLL.Entities;
using CardGame.DAL.Configuration;

namespace CardGame.DAL.Contexts
{
    public class CardGameDbContext : DbContext
    {
        public DbSet<Card> Cards { get; set; }
        public DbSet<Deck> Decks { get; set; }
        public DbSet<DeckCard> DecksCard { get; set; }
        public DbSet<Game> Game { get; set; }
        public DbSet<Player> Player { get; set; }

        private readonly string CurrentUser;
         public CardGameDbContext(DbContextOptions<CardGameDbContext> options, IUserResolverService userResolverService) : base(options)
        {
            CurrentUser = userResolverService.GetCurrentUserIp();  // tbc...
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // add you configurations here
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new DeckConfiguration());
            modelBuilder.ApplyConfiguration(new CardConfiguration());
            modelBuilder.ApplyConfiguration(new DeckCardConfiguration());
            modelBuilder.ApplyConfiguration(new GameConfiguration());
            modelBuilder.ApplyConfiguration(new PlayerConfiguration());

            var entityTypes = modelBuilder.Model.GetEntityTypes().Select(t => t.ClrType).ToList();

            entityTypes.ForEach(type =>
            {
                if (type.IsSubclassOf(typeof(BaseEntity)))
                    modelBuilder.Entity(type).HasQueryFilter(GetSoftDeleteFilter(type));
            });
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var changes = ChangeTracker.Entries().Where(e => (e.State == EntityState.Added || e.State == EntityState.Modified));
            var currentDate = DateTime.UtcNow;

            foreach (var entry in changes)
            {
                if(entry.Entity is BaseEntity entity)
                {
                    if(entry.State == EntityState.Added)
                    {
                        entity.AddAuditDataOnCreation(CurrentUser, currentDate);
                    }

                    entity.AddAuditDataOnEdit(CurrentUser, currentDate);
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }

        private LambdaExpression GetSoftDeleteFilter(Type type)
        {
            var method = typeof(CardGameDbContext).GetMethod(nameof(ApplySoftDeleteFilter), BindingFlags.NonPublic | BindingFlags.Instance);
            return method
                .MakeGenericMethod(new[] { type })
                .Invoke(this, new object[] { }) as LambdaExpression;
        }

        private LambdaExpression ApplySoftDeleteFilter<T>() where T : BaseEntity
        {
            Expression<Func<T, bool>> filter = (x) => !x.isDeleted;
            return filter;
        }
    }
}
