using Omi.Modules.ModuleBase;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Logging;
using Omi.Base;
using Omi.Modules.Location.Services;
using System.Linq;
using Omi.Modules.Location.ViewModel;

namespace Omi.Modules.Location.Controllers
{
    public class LocationController : BaseController
    {
        private readonly LocationService _locationService;
        public LocationController(
            LocationService locationService,
            ILogger<LocationService> logger) : base(logger)
        {
            _locationService = locationService;
        }

        public BaseJsonResult GetGeographicaLocations()
        {
            var locations = _locationService.GetGeographicaLocations();
            var viewModel = locations.Select(o => GeographicaLocationViewModel.FromEntity(o));

            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED, viewModel);
        }
    }
}
