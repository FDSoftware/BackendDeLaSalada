using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FakeBackend.Controllers
{
    [ApiController]
    [Route("search")]
    public class SearchController : ControllerBase
    {
        private readonly ILogger<ApiController> _logger;
        public SQLite mySQL = new SQLite();

        public SearchController(ILogger<ApiController> logger) //constructore con el logger
        {
            _logger = logger;
        }
        [HttpGet]
        public string Get()
        {
            return "hello";
        }
        [HttpPost]
        public IActionResult ConverterPost(OldSearchResult inSearch)
        {
            _logger.LogInformation(inSearch.kunnr);
            return Ok(new { data = new SearchResult(inSearch) });
        }
        //public async Task<ActionResult> Get() => NotFound();
    }
}
