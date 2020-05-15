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
        public string GetR(string id)
        {
            //Helpers.
            _logger.LogInformation("Me llego el id: {Id}", id);
            return "hola tu id es: " + id;
        }
    }
}
