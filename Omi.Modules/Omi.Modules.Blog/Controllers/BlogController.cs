using Omi.Modules.ModuleBase;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Omi.Data;
using Omi.Base;
using Microsoft.AspNetCore.Mvc;
using Omi.Modules.Blog.Services;
using Omi.Modules.Blog.ViewModels;
using System.Linq;
using Omi.Modules.ModuleBase.ViewModels;
using Omi.Modules.Blog.ServiceModel;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Omi.Base.Collection;
using Omi.Modules.Blog.Entities;
using Omi.Base.ViewModel;
using System.Collections.Generic;
using Omi.Modules.ModuleBase.Base.ServiceModel;

namespace Omi.Modules.Blog
{
    public class BlogController : BaseController
    {
        public readonly BlogService _blogService;

        public BlogController(
            BlogService blogService,
            ILogger<BlogController> logger, 
            UserManager<ApplicationUser> userManager) : base(logger, userManager)
        {
            _blogService = blogService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<OkObjectResult> Get(BlogGetViewModel viewModel)
        {
            var entityIds = new List<long>();
            if (viewModel.Id != default)
                entityIds.Add(viewModel.Id);

            var filterServiceModel = AutoMapper.Mapper.Map<BlogFilterServiceModel>(viewModel);
            filterServiceModel.Ids = entityIds;

            var blogs = _blogService.GetBlogs(filterServiceModel);
            if (string.IsNullOrEmpty(viewModel.SortField) == false)
            {
                if (viewModel.SortField == "title")
                    blogs = (viewModel.SortOrder == "ascend") ? blogs.OrderBy(o => o.Details.FirstOrDefault().Title) : blogs.OrderByDescending(o => o.Details.FirstOrDefault().Title);
            }

            object actionOkResult = null;  

            if (viewModel.GetMode == (int)GetMode.Paginated)
            {
                var pageList = await PaginatedList<BlogEntity>.CreateAsync(blogs, viewModel.Page, viewModel.PageSize);
                var result = new PageEntityViewModel<BlogEntity, BlogViewModel>(pageList, entity => BlogViewModel.FromEntity(entity));
                
                actionOkResult = result;
            }
            else if(viewModel.GetMode == (int)GetMode.List)
            {
                var result = blogs.Select(o => BlogEditViewModel.FromEntity(o));
                actionOkResult = result;
            }
            else
            {
                var blog = blogs.FirstOrDefault(o => o.Id == viewModel.Id || o.Name == viewModel.Name);

                var result = new BlogEditViewModel();

                if (blog != null)
                    result = BlogEditViewModel.FromEntity(blog);

                actionOkResult = result;
            }

            return Ok(actionOkResult);
        }

        [HttpPost]
        public async Task<BaseJsonResult> Create([FromBody]BlogViewModel viewModel)
        {
            var serviceModel = BlogServiceModel.FromViewModel(viewModel);
            serviceModel.User = CurrentUser;

            var entityResult = await _blogService.CreateBlogAsync(serviceModel);

            return new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED, entityResult.Id);
        }

        [HttpPut]
        public async Task<BaseJsonResult> Update([FromBody]BlogViewModel viewModel)
        {
            var serviceModel = BlogServiceModel.FromViewModel(viewModel);
            serviceModel.User = CurrentUser;

            await _blogService.UpdateBlogAsync(serviceModel);

            return new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED, viewModel.Id);
        }

        [HttpDelete]
        public async Task<BaseJsonResult> Delete([FromBody]EntityDeleteViewModel viewModel)
        {
            var serviceModel = new DeleteServiceModel
            {
                Ids = viewModel.Ids,
                DeleteBy = CurrentUser
            };

            var result = await _blogService.DeleteBlogAsync(serviceModel);

            return new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED, result);
        }
    }
}
