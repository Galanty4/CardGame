using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CardGame.Controllers
{
    [EnableCors]
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected const string ApiV1Route = "v1/[controller]";
    }
}
