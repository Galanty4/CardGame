using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardGame.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.Extensions.Logging;
using Serilog;
using CardGame.WebApi.Middleware;
using CardGame.DAL.Contexts;
using Microsoft.EntityFrameworkCore;

namespace CardGame.WebApi
{
    public class Startup
    {
        public IConfiguration Configuration { get; set; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder => builder
                    .SetIsOriginAllowed((t) => true)
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .AllowAnyHeader());
            });


            services.AddHttpContextAccessor();
            services.AddDbContexts(Configuration);
            services.ConfigureCustomService();

            services.AddSwaggerGen();

            services.AddAuthentication(IISDefaults.AuthenticationScheme);
            services.AddAuthorization();

            services.AddControllers();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build"; // your publish path
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseSerilogRequestLogging();

            app.UseRouting();
            app.UseCors();

            app.UseSwagger();
            app.UseSwaggerUI(x =>
            {
                if (env.IsDevelopment())
                {
                    x.SwaggerEndpoint("/swagger/v1/swagger.json", "CardGame WebApi v1");
                }
                else
                {
                    x.SwaggerEndpoint("/api/swagger/v1/swagger.json", "CardGame WebApi v1");
                }
            });
            
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(config =>
            {
                config.Options.SourcePath = "ClientApp"; // your SPA path

                if (env.IsDevelopment()) 
                {
                    config.UseProxyToSpaDevelopmentServer("http://localhost:3000"); // your SPA server
                }
            });
        }
    }
}
