using Omi.Modules.Blog.Entities;
using Omi.Modules.ModuleBase.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Blog.ViewModels
{
    public class BlogEditViewModel : BlogViewModel
    {
        public IEnumerable<TaxomonyViewModel> AvaliableBrands { get; set; }
        public IEnumerable<TaxomonyViewModel> AvaliableBlogTypes { get; set; }

        public static new BlogEditViewModel FromEntity(BlogEntity entity)
        {
            var baseViewModel = BlogViewModel.FromEntity(entity);

            var viewModel = AutoMapper.Mapper.Map<BlogEditViewModel>(baseViewModel);

            return viewModel;
        }
    }
}