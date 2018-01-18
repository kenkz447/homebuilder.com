using Omi.Extensions;
using Omi.Modules.Blog.Entities;
using Omi.Modules.FileAndMedia.Base;
using Omi.Modules.FileAndMedia.ViewModel;
using Omi.Modules.ModuleBase.ViewModels;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Omi.Modules.Blog.ViewModels
{
    public class BlogViewModel
    {
        [DefaultValue(0)]
        public long Id { get; set; }
        public string Name { get; set; }

        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }

        //[Required]
        public FileEntityInfo Avatar { get; set; }
        public IEnumerable<FileEntityInfo> Pictures { get; set; }

        public static BlogViewModel FromEntity(BlogEntity entity)
        {
            var blogEntityDetail = entity.Details.First();

            var viewModelFromBlog = AutoMapper.Mapper.Map<BlogViewModel>(entity);
            var viewModelFromBlogDetail = AutoMapper.Mapper.Map<BlogViewModel>(blogEntityDetail);

            var viewModel = viewModelFromBlog.MergeWith(viewModelFromBlogDetail);

            var avatar = entity.EntityFiles.FirstOrDefault(o => o.UsingType == (int)FileUsingType.Avatar)?.FileEntity;
            if(avatar != null)
                viewModel.Avatar = FileEntityInfo.FromEntity(avatar);

            var pictures = entity.EntityFiles.Where(o => o.UsingType == (int)FileUsingType.Picture);
            viewModel.Pictures = pictures.Select(picture => FileEntityInfo.FromEntity(picture.FileEntity));

            return viewModel;
        }
    }
}