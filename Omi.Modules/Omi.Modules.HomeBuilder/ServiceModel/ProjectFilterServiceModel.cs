using Omi.Base;
using Omi.Modules.HomeBuilder.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.HomeBuilder.ServiceModel
{
    public class ProjectFilterServiceModel: BaseFilterServiceModel
    {
        public string CityName { get; set; }
        public List<string> TaxonomyNames { get; set; }

        public static ProjectFilterServiceModel FromViewModel(ProjectFilterViewModel viewModel)
        {
            var taxonomyNames = new List<string>();
            if (viewModel.ProjectType != null)
                taxonomyNames.Add(viewModel.ProjectType);

            return new ProjectFilterServiceModel
            {
                Page = viewModel.Page,
                PageSize = viewModel.PageSize,
                SortBy = viewModel.SortBy,
                CityName = viewModel.City,
                TaxonomyNames = taxonomyNames
            };
        }
    }
}
