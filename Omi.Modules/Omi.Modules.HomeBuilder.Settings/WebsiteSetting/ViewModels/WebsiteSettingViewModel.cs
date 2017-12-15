using Omi.Modules.Setting.Entities;
using Omi.Modules.Setting.Infrastructure;
using Omi.Modules.Setting.ViewModels;
using System.Linq;

namespace Omi.Modules.HomeBuilder.Settings.WebsiteSetting.ViewModels
{
    public partial class WebsiteSettingViewModel
    {
        public long SettingEntityId { get; set; }

        [EntitySettingValue(Name = "SiteTitle")]
        public SettingValueViewModel SiteTitle { get; set; }

        [EntitySettingValue(Name = "SiteDescription")]
        public SettingValueViewModel SiteDescription { get; set; }

        [EntitySettingValue(Name = "CompanyName")]
        public SettingValueViewModel CompanyName { get; set; }

        [EntitySettingValue(Name = "CompanyLogo")]
        public SettingValueViewModel CompanyLogo { get; set; }

        [EntitySettingValue(Name = "CompanyAddress")]
        public SettingValueViewModel CompanyAddress { get; set; }

        [EntitySettingValue(Name = "SocialNetworks")]
        public SettingValueViewModel SocialNetworks { get; set; }

        [EntitySettingValue(Name = "ContactBannerImage")]
        public SettingValueViewModel ContactBannerImage { get; set; }

        [EntitySettingValue(Name = "ContactWelcomeHtml")]
        public SettingValueViewModel ContactWelcomeHtml { get; set; }

        [EntitySettingValue(Name = "ContactInfoHtml")]
        public SettingValueViewModel ContactInfoHtml { get; set; }

        [EntitySettingValue(Name = "ContactSendToEmail")]
        public SettingValueViewModel ContactSendToEmail { get; set; }

        [EntitySettingValue(Name = "ContactSendFromEmail")]
        public SettingValueViewModel ContactSendFromEmail { get; set; }

        [EntitySettingValue(Name = "ContactSendFromEmailPassword")]
        public SettingValueViewModel ContactSendFromEmailPassword { get; set; }

        [EntitySettingValue(Name = "ContactMapLatitude")]
        public SettingValueViewModel ContactMapLatitude { get; set; }

        [EntitySettingValue(Name = "ContactMapLongitude")]
        public SettingValueViewModel ContactMapLongitude { get; set; }
    }

    public partial class WebsiteSettingViewModel
    {
        public static WebsiteSettingViewModel FromEntity(SettingEntity entity)
        {
            var settingValues = entity.SettingValues;

            var siteTitle = entity.SettingValues.FirstOrDefault(o => o.Name == "SiteTitle");
            var siteDescription = entity.SettingValues.FirstOrDefault(o => o.Name == "SiteDescription");
            var companyName = entity.SettingValues.FirstOrDefault(o => o.Name == "CompanyName");
            var companyLogo = entity.SettingValues.FirstOrDefault(o => o.Name == "CompanyLogo");
            var companyAddress = entity.SettingValues.FirstOrDefault(o => o.Name == "CompanyAddress");
            var socialNetworks = entity.SettingValues.FirstOrDefault(o => o.Name == "SocialNetworks");
            var contactBannerImage = entity.SettingValues.FirstOrDefault(o => o.Name == "ContactBannerImage");
            var contactWelcomeHtml = entity.SettingValues.FirstOrDefault(o => o.Name == "ContactWelcomeHtml");
            var contactInfoHtml = entity.SettingValues.FirstOrDefault(o => o.Name == "ContactInfoHtml");
            var contactSendToEmail = entity.SettingValues.FirstOrDefault(o => o.Name == "ContactSendToEmail");
            var contactSendFromEmail = entity.SettingValues.FirstOrDefault(o => o.Name == "ContactSendFromEmail");
            var contactSendFromEmailPassword = entity.SettingValues.FirstOrDefault(o => o.Name == "ContactSendFromEmailPassword");
            var contactMapLatitude = entity.SettingValues.FirstOrDefault(o => o.Name == "ContactMapLatitude");
            var contactMapLongitude = entity.SettingValues.FirstOrDefault(o => o.Name == "ContactMapLongitude");

            return new WebsiteSettingViewModel
            {
                SettingEntityId = entity.Id,
                SiteTitle = SettingValueViewModel.FromEntity(siteTitle),
                SiteDescription = SettingValueViewModel.FromEntity(siteDescription),
                CompanyName = SettingValueViewModel.FromEntity(companyName),
                CompanyLogo = SettingValueViewModel.FromEntity(companyLogo),
                CompanyAddress = SettingValueViewModel.FromEntity(companyAddress),
                SocialNetworks = SettingValueViewModel.FromEntity(socialNetworks),
                ContactInfoHtml = SettingValueViewModel.FromEntity(contactInfoHtml),
                ContactBannerImage = SettingValueViewModel.FromEntity(contactBannerImage),
                ContactWelcomeHtml = SettingValueViewModel.FromEntity(contactWelcomeHtml),
                ContactSendToEmail = SettingValueViewModel.FromEntity(contactSendToEmail),
                ContactSendFromEmail = SettingValueViewModel.FromEntity(contactSendFromEmail),
                ContactSendFromEmailPassword = SettingValueViewModel.FromEntity(contactSendFromEmailPassword),
                ContactMapLatitude = SettingValueViewModel.FromEntity(contactMapLatitude),
                ContactMapLongitude = SettingValueViewModel.FromEntity(contactMapLongitude  ),
            };
        }
    }
}