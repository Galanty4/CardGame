using CardGame.BLL.Models;
using CardGame.BLL.Repositories;
using CardGame.DAL.Contexts;

namespace CardGame.DAL.Repositories
{
    public class CardRepository : BaseRepository<Card>, ICardRepository 
    {
        public CardRepository(CardGameDbContext context) : base(context) { }
    }
}
