using Omi.Extensions;
using Omi.Modules.ModuleBase.Entities;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Omi.Modules.ModuleBase.ViewModels
{
    public class TaxomonyViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Label { get; set; }
        public string Icon { get; set; }
        public long? TaxonomyTypeId { get; set; }
        public long? ParentId { get; set; }
        public IEnumerable<TaxomonyViewModel> Children { get; set; }

        public static TaxomonyViewModel FromEntity(TaxonomyEntity entity)
        {
            var currentCulture = CultureInfo.CurrentCulture;

            var taxonomyDetail = entity.Details.FirstOrDefault(o => o.ForCurrentRequestLanguage());

            return new TaxomonyViewModel
            {
                Id = entity.Id,
                Name = entity.Name,
                Label = taxonomyDetail?.Label,
                Icon = taxonomyDetail?.Icon,
                TaxonomyTypeId = entity.TaxonomyTypeId,
                ParentId = entity.ParentId,
                Children = entity.Children?.Select(o => FromEntity(o))
            };
        }
    }
}
