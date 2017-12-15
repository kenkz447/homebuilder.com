using Omi.Modules.HomeBuilder.ServiceModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.HomeBuilder.ViewModels
{
    public class ProjectFilterViewModel
    {
        public string Title { get; set; }

        public ProjectFilterViewModel()
        {
            Page = 1;
            PageSize = 9;
        }

        public string SortBy { get; set; }
        public string City { get; set; }

        public string ProjectType { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
