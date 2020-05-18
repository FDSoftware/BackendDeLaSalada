using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FakeBackend.Controllers
{
    public class BlogController : ApiController
    {
        private readonly ILogger<BlogController> _logger;
        public BlogController(ILogger<BlogController> logger)
        {
            _logger = logger;
        }

        [HttpPost("blog")]
        public IActionResult PostR(int id, Blog inBlog)
        {
            if (inBlog.validate())
            {
                mySQL.dbContext.Blogs.Add(inBlog);
                mySQL.dbContext.SaveChanges();

                return Ok(new { StatusCode = "Blog creado correctamente", BlogID = inBlog.BlogId });
            }
            return BadRequest();
        }

        [HttpGet("{id:required}")]
        public IActionResult GetR(int id)
        {
            //Helpers.
            _logger.LogInformation("Me llego el id: {Id}", id);
            foreach (var blog in mySQL.dbContext.Blogs) //esto tendria que ser con una query si fuera SQL
            {

                _logger.LogInformation($"BlogID={blog.BlogId}\tTitle={blog.Title}\t{blog.SubTitle}");
                if (id == blog.BlogId)
                    return Ok(new { blog });
            }
            return NotFound(new { response = "Blog no encontrado" });
        }

    }
}
