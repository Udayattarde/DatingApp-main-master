using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Helpers;
using API.interfaces;
using API.services;
using Microsoft.EntityFrameworkCore;

namespace API.Extenions
{
    public  static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection service,IConfiguration config)
        {
            service.AddScoped<ITokenService,tokenService>();
            service.AddScoped<IUserRespositry,UserRespository>();
            service.AddAutoMapper(typeof(AutoMapperProfile).Assembly);
             service.AddDbContext<DataContext>(options =>{
                 options.UseSqlite(config.GetConnectionString("DefaultConnections"));
            });
           

            return service;
        }
    }
}