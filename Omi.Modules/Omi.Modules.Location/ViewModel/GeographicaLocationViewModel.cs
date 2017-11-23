using Omi.Modules.Location.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Location.ViewModel
{
    public class GeographicaLocationViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Label { get; set; }
        public MapMarkerViewModel Marker { get; set; }

        public static GeographicaLocationViewModel FromEntity(GeographicaLocation entity)
        {
            var viewModel = new GeographicaLocationViewModel
            {
                Id = entity.Id,
                Name = entity.Name,
                Label = entity.Label,
            };

            if(entity.JsonOptions != null)
                viewModel.Marker = Newtonsoft.Json.JsonConvert.DeserializeObject<MapMarkerViewModel>(entity.JsonOptions);

            return viewModel;
        }
    }
}
