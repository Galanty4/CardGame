using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardGame.BLL.Repositories;
using CardGame.BLL.Services.Interfaces;
using CardGame.BLL.Services.Internal;
using CardGame.DAL.Contexts;
using CardGame.DAL.Repositories;
using CardGame.Services.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CardGame.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static void ConfigureCustomService(this IServiceCollection services)
        {
            //add custom services here
            //e.g. services.AddSingleton()
            services.AddScoped<ICardService, CardService>();
            services.AddScoped<ICardRepository, CardRepository>();
            services.AddScoped<IUserResolverService, UserResolverService>();
        }

        public static void AddDbContexts(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<CardGameDbContext>(options =>
            {
                options.UseSqlServer(
                    configuration.GetSection("ConnectionStrings")["CardGameDatabase"]);
            });
        }
    }
}
