using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Omi.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index ()
        {
            return File("~index.html", "text/html");
        }
    }
}
