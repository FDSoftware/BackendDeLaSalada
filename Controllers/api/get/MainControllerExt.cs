using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FakeBackend.Controllers
{
    public class FBController : ApiController
    {
        private readonly ILogger<FBController> _logger;
        public FBController(ILogger<FBController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{id:required}")]
        public string GetR(int id)
        {
            //Helpers.
            _logger.LogInformation("Me llego el id: {Id}", id);
           // mySQL.dbContext.Database.EnsureCreated();
            if (!mySQL.dbContext.Blogs.Any())
            {
                mySQL.dbContext.Blogs.AddRange(new Blog[]
                    {
                           new Blog{ BlogId=1, Title="Blog 1", SubTitle="Blog 1 subtitle" },
                           new Blog{ BlogId=id, Title="Blog 2", SubTitle="Blog 2 subtitle" },
                           new Blog{ BlogId=3, Title="Blog 3", SubTitle="Blog 3 subtitle" }
                    });
                mySQL.dbContext.SaveChanges();
            }
            foreach (var blog in mySQL.dbContext.Blogs)
            {
                Console.WriteLine($"BlogID={blog.BlogId}\tTitle={blog.Title}\t{blog.SubTitle}");
            }
            return "hola tu id es: " + id;
        }
    }
}
