using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Blog.ViewModels
{
    public class BlogGetViewModel
    {
        public string SortField { get; set; }
        public string SortOrder { get; set; }

        public string Title { get; set; }

        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 9;

        public long Id { get; set; }
        public string Name { get; set; }
        public int GetMode { get; set; }
        public bool IsEditModel { get; set; }
        public IEnumerable<long> TaxonomyIds { get; set; }
    }
}