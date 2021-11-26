using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardGame.BLL.Entities;
using CardGame.BLL.Repositories;
using CardGame.DAL.Contexts;
using Microsoft.EntityFrameworkCore;

namespace CardGame.DAL.Repositories
{
    public class DeckCardRepository : BaseRepository<DeckCard>, IDeckCardRepository
    {
        public DeckCardRepository(CardGameDbContext context) : base(context) { }

        public async Task<List<DeckCard>> GetByDeckIdIncludeCards(int deckId) =>
            await DbContext.DecksCard
            .Include(deckCard => deckCard.Card)
            .Where(deckCard => deckCard.DeckId == deckId)
            .ToListAsync();
            
    }
}
