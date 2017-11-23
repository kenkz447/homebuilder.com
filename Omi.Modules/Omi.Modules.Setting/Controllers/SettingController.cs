using Omi.Modules.ModuleBase;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Omi.Data;
using Omi.Modules.Setting.Services;

namespace Omi.Modules.Setting.Controllers
{
    public class SettingController : BaseController
    {
        public readonly SettingService _settingService;

        public SettingController(
            SettingService settingService,
            ILogger<SettingController> logger, 
            UserManager<ApplicationUser> userManager) 
            : base(logger, userManager)
        {
            _settingService = settingService;
        }

    }
}
