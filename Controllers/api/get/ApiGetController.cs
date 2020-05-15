using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FakeBackend.Controllers
{
    public class FallBackController : ApiController
    {
        private readonly ILogger<FallBackController> _logger;
        public FallBackController(ILogger<FallBackController> logger)
        {
            _logger = logger;
        }
        [HttpGet]
        public string Get()
        {
            _logger.LogInformation("Fallback sin id");
            return "SUBARU GOES SUTUTUUTUTUTU";
        }
    }
}
