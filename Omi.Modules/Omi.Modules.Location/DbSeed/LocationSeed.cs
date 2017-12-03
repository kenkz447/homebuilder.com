using Omi.Modules.Location.Entities;
using Omi.Modules.Location.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Omi.Extensions;
using Omi.Base;

namespace Omi.Modules.Location.DbSeed
{
    public class LocationSeed : IDbSeed
    {
        public static GeographicaLocation HoChiMinh = new GeographicaLocation
        {
            Name = "ho-chi-minh",
            Label = "Hồ Chí Minh",
            LocationType = (int)LocationType.City
        };

        public static GeographicaLocation DaNang = new GeographicaLocation
        {
            Name = "da-nang",
            Label = "Đà Nẵng",
            LocationType = (int)LocationType.City
        };

        public async Task SeedAsync(DbContext dbConext)
        {
            var locationSet = dbConext.Set<GeographicaLocation>();

            HoChiMinh = locationSet.SeedEntity(HoChiMinh);
            DaNang = locationSet.SeedEntity(DaNang);

            await dbConext.SaveChangesAsync();
        }
    }
}
