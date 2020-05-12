using EJournal.Data.EfContext;
using EJournal.Data.Entities.AppUeser;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EJournal.Data.SeedData
{
    public class Seed
    {
        public static async Task SeedData(IServiceProvider services, IHostingEnvironment env, IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<DbUser>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<DbRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EfDbContext>();
               // context.Database.Migrate();
                PreConfigured.SeedRoles(managerRole);
                await PreConfigured.SeedUsers(manager, context);
            }
        }
    }
}
