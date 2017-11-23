using Microsoft.EntityFrameworkCore;
using Omi.Modules.Location.Entities;
using Omi.Modules.ModuleBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Omi.Modules.Location.Services
{
    public class LocationService
    {
        private readonly LocationDbContext _dbContext;

        public LocationService(LocationDbContext dbContext) {
            _dbContext = dbContext;
        }

        private IQueryable<GeographicaLocation> GeographicaLocationQuery
        {
            get
            {
                return _dbContext.GeographicaLocation.AsNoTracking();
            }
        }

        public IEnumerable<GeographicaLocation> GetGeographicaLocations()
            => GeographicaLocationQuery;

        public async Task<GeographicaLocation> GetGeographicaLocation(string name)
            => await GeographicaLocationQuery
                .SingleAsync(o => o.Name == name);


    }
}