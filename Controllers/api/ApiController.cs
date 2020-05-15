using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FakeBackend.Controllers
{
    [ApiController]
    [Route("api")]
    public class ApiController : ControllerBase
    {
        private readonly ILogger<ApiController> _logger;
        public ApiController() 
        {
            // este constructor vacio es para la herencia a los otros metodos
            // igual tendria que instanciar la DB aca para que este disponible para el resto
        }

        public ApiController(ILogger<ApiController> logger) //constructore con el logger
        {
            _logger = logger;
        }
        //public async Task<ActionResult> Get() => NotFound();
    }
}
