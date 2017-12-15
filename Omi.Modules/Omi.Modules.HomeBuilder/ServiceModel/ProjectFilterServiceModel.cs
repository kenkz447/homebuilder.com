using Omi.Base;
using Omi.Modules.HomeBuilder.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.HomeBuilder.ServiceModel
{
    public class ProjectFilterServiceModel: BaseFilterServiceModel<long>
    {
        public string Title { get; set; }
        public string City { get; set; }
        public List<string> TaxonomyNames { get; set; }

        public string SortBy { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }

        public static ProjectFilterServiceModel FromViewModel(ProjectFilterViewModel viewModel)
        {
            var serviceModel = AutoMapper.Mapper.Map<ProjectFilterServiceModel>(viewModel);

            serviceModel.TaxonomyNames = new List<string>();
            if (viewModel.ProjectType != null)
                serviceModel.TaxonomyNames.Add(viewModel.ProjectType);

            return serviceModel;
        }
    }
}
