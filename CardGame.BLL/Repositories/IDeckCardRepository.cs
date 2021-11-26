using System.Collections.Generic;
using System.Threading.Tasks;
using CardGame.BLL.Entities;

namespace CardGame.BLL.Repositories
{

    public interface IDeckCardRepository : IBaseRepository<DeckCard>
    {
        Task<List<DeckCard>> GetByDeckIdIncludeCards(int deckId);
    }
}
