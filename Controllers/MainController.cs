using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FakeBackend.Controllers
{
    [Route("")]
    public class MainController : ControllerBase
    {
        private readonly ILogger<ApiController> _logger;
        public SQLite mySQL = new SQLite();

        public MainController(ILogger<ApiController> logger) //constructore con el logger
        {
            _logger = logger;
        }
        [HttpGet]
        public string Get()
        {
            return "hello";
        }
        //public async Task<ActionResult> Get() => NotFound();
    }
}
