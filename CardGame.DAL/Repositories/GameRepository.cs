using CardGame.BLL.Entities;
using CardGame.BLL.Repositories;
using CardGame.DAL.Contexts;

namespace CardGame.DAL.Repositories
{
    public class GameRepository : BaseRepository<Game>, IGameRepository
    {
        public GameRepository(CardGameDbContext context) : base(context) { }
    }
}
