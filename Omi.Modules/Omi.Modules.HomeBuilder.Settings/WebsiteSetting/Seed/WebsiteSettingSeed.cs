using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Omi.Modules.Setting.Entities;
using Omi.Extensions;
using System.Threading;
using System.Collections.Generic;
using Omi.Base;

namespace Omi.Modules.HomeBuilder.Settings.WebsiteSetting.Seed
{
    public class WebsiteSettingSeed : IDbSeed
    {
        public static SettingEntity HomeSetting = new SettingEntity
        {
            Name = "website",
        };

        private List<SettingValue> settingValues = new List<SettingValue>() {
                new SettingValue {
                    Name = "SiteTitle",
                },
                new SettingValue {
                    Name = "SiteDescription",
                },
                new SettingValue {
                    Name = "CompanyName",
                },
                new SettingValue {
                    Name = "CompanyLogo",
                },
                new SettingValue {
                    Name = "CompanyAddress",
                },
                new SettingValue {
                    Name = "SocialNetworks",
                },
                new SettingValue {
                    Name = "ContactBannerImage",
                },
                new SettingValue {
                    Name = "ContactWelcomeHtml",
                },
                new SettingValue {
                    Name = "ContactInfoHtml",
                },
                new SettingValue {
                    Name = "ContactSendToEmail",
                },
                new SettingValue {
                    Name = "ContactSendFromEmail",
                },
                new SettingValue {
                    Name = "ContactSendFromEmailPassword",
                },
                new SettingValue {
                    Name = "ContactMapLatitude",
                },
                new SettingValue {
                    Name = "ContactMapLongitude",
                },
         };

        public async Task SeedAsync(DbContext dbConext)
        {
            var settingSet = dbConext.Set<SettingEntity>();
            HomeSetting = settingSet.SeedEntity(HomeSetting);

            var settingValueSet = dbConext.Set<SettingValue>();
            foreach (var valueEntity in settingValues)
            {
                valueEntity.SettingEntityId = HomeSetting.Id;
                valueEntity.Language = Thread.CurrentThread.CurrentCulture.Name;
                settingValueSet.SeedEntity(valueEntity);
            }
            await dbConext.SaveChangesAsync();
        }
    }
}