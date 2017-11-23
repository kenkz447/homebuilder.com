using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Omi.Data;

namespace Omi.Modules.ModuleBase
{
    [Authorize]
    public abstract class BaseController : ControllerBase
    {
        public ApplicationUser CurrentUser
        {
            get
            {
                return _userManager.FindByNameAsync(User.Identity.Name).Result;
            }
        }

        public readonly ILogger _logger;
        public readonly UserManager<ApplicationUser> _userManager;

        public BaseController(ILogger logger)
        {
            _logger = logger;
        }

        public BaseController(ILogger logger, UserManager<ApplicationUser> userManager)
        {
            _logger = logger;
            _userManager = userManager;
        }
    }
}
