using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace FakeBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            
            ///SQLLLLLLLLLLLL
            string dbName = "./TestDatabase.db";
            if (System.IO.File.Exists(dbName))
            {
            }
            using (var dbContext = new MyDbContext())
            {
                dbContext.Database.EnsureCreated();
                if (!dbContext.Blogs.Any())
                {
                    dbContext.Blogs.AddRange(new Blog[]
                        {
                             new Blog{ BlogId=1, Title="Blog 1", SubTitle="Blog 1 subtitle" },
                             new Blog{ BlogId=2, Title="Blog 2", SubTitle="Blog 2 subtitle" },
                             new Blog{ BlogId=3, Title="Blog 3", SubTitle="Blog 3 subtitle" }
                        });
                    dbContext.SaveChanges();
                }
                foreach (var blog in dbContext.Blogs)
                {
                    Console.WriteLine($"BlogID={blog.BlogId}\tTitle={blog.Title}\t{blog.SubTitle}");
                }
            }
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
