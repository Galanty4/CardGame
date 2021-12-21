using System.Collections.Generic;
using System.Threading.Tasks;
using CardGame.BLL.Entities;
using CardGame.BLL.Models.Dto;
using CardGame.BLL.Repositories;
using CardGame.DAL.Contexts;
using Microsoft.EntityFrameworkCore;

namespace CardGame.DAL.Repositories
{
    public class DeckRepository : BaseRepository<Deck>, IDeckRepository
    {
        public DeckRepository(CardGameDbContext context) : base(context) { }
    }
}
