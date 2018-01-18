using Omi.Data;
using Omi.Extensions;
using Omi.Modules.Blog.Entities;
using Omi.Modules.Blog.ViewModels;
using Omi.Modules.FileAndMedia.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Omi.Modules.Blog.ServiceModel
{
    public class BlogServiceModel
    {
        public BlogEntity Blog { get; set; }
        public ApplicationUser User { get; set; }

        public static BlogServiceModel FromViewModel(BlogViewModel viewModel)
        {
            var blog = AutoMapper.Mapper.Map<BlogEntity>(viewModel);
            var detail = AutoMapper.Mapper.Map<BlogDetail>(viewModel);

            var files = new List<BlogFile>();

            if (viewModel.Avatar != null)
                files.Add(new BlogFile
                {
                    UsingType = (int)FileUsingType.Avatar,
                    FileEntityId = viewModel.Avatar.FileId,
                    EntityId = viewModel.Id,
                });

            if (viewModel.Pictures != null)
                files.AddRange(viewModel.Pictures.Select(picture => new BlogFile
                {
                    UsingType = (int)FileUsingType.Picture,
                    FileEntityId = picture.FileId,
                    EntityId = viewModel.Id,
                }));

            blog.Name = viewModel.Title.ToEntityName();
            blog.Details = new List<BlogDetail>()
            {
                detail
            };

            blog.EntityFiles = files;

            return new BlogServiceModel
            {
                Blog = blog
            };
        }
    }
}
