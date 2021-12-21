using CardGame.BLL.Entities;
using CardGame.BLL.Repositories;
using CardGame.DAL.Contexts;

namespace CardGame.DAL.Repositories
{
    public class PlayerRepository : BaseRepository<Player>, IPlayerRepository
    {
        public PlayerRepository(CardGameDbContext context) : base(context) { }
    }
}
