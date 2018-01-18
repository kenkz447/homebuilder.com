using Omi.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Blog.ServiceModel
{
    public class BlogFilterServiceModel : BaseFilterServiceModel<long>
    {
        public string Name { get; set; }
        public string Title { get; set; }
    }
}
