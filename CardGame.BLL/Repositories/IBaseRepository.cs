using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CardGame.BLL.Repositories
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        Task<TEntity> AddAsync(TEntity entity);
        Task AddRangeAsync(IEnumerable<TEntity> entities);
        Task SaveAsync();
        Task<TEntity> GetAsync(int id);
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task DeleteAsync(int id);
    }
}
