using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Omi.Base;
using Omi.Data;
using Omi.Modules.HomeBuilder.Settings.WebsiteSetting.ServiceModels;
using Omi.Modules.HomeBuilder.Settings.WebsiteSetting.Services;
using Omi.Modules.HomeBuilder.Settings.WebsiteSetting.ViewModels;
using Omi.Modules.ModuleBase;
using System.Threading.Tasks;

namespace Omi.Modules.HomeBuilder.Settings.WebsiteSetting.Controllers
{
    public class WebsiteSettingController : BaseController
    {
        public readonly WebsiteSettingService _websiteSettingService;
        public WebsiteSettingController(
            WebsiteSettingService websiteSettingService,
            ILogger<WebsiteSettingController> logger, 
            UserManager<ApplicationUser> userManager) : base(logger, userManager)
        {
            _websiteSettingService = websiteSettingService;
        }

        public async Task<BaseJsonResult> UpdateSetting([FromBody]WebsiteSettingViewModel viewModel)
        {
            var updateWebsiteSettingServiceModel = UpdateWebsiteSettingServiceModel.FromViewModel(viewModel);
            updateWebsiteSettingServiceModel.UpdateBy = CurrentUser;

            await _websiteSettingService.UpdateSetting(updateWebsiteSettingServiceModel);

            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED);
        }

        [AllowAnonymous]
        public async Task<BaseJsonResult> GetSetting()
        {
            var websiteSettingEntity = await _websiteSettingService.GetSetting();
            var viewModel = WebsiteSettingViewModel.FromEntity(websiteSettingEntity);
            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED, viewModel);
        }
    }
}