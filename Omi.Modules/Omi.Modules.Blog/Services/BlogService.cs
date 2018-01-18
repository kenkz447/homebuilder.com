using Microsoft.EntityFrameworkCore;
using Omi.Base;
using Omi.Extensions;
using Omi.Modules.Blog.Entities;
using Omi.Modules.Blog.ServiceModel;
using Omi.Modules.ModuleBase.Base.ServiceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Omi.Modules.Blog.Services
{
    public class BlogService
    {
        private readonly BlogDbContext _context;

        private IQueryable<BlogEntity> AllBlog
        {
            get
            {
                return _context.BlogEntity
                .Include(o => o.Details)
                .Include(o => o.EntityFiles)
                .ThenInclude(o => o.FileEntity);
            }
        }

        public BlogService(BlogDbContext context)
        {
            _context = context;
        }

        public IQueryable<BlogEntity> GetBlogs(BlogFilterServiceModel serviceModel)
        {
            var blogs = this.AllBlog.FilterByServiceModel(serviceModel);

            if(!string.IsNullOrEmpty(serviceModel.Title))
                blogs = blogs.Where(o => o.Details.FirstOrDefault(d => d.Title != null && (d.Title.ToLower().Contains(serviceModel.Title.ToLower()) || serviceModel.Title.ToLower().Contains(d.Title.ToLower()))) != null);

            if (!string.IsNullOrEmpty(serviceModel.Name))
                blogs = blogs.Where(o => o.Name == serviceModel.Name);

            blogs = blogs.OrderByDescending(o => o.Id);
            return blogs;
        }

        public async Task<BlogEntity> CreateBlogAsync(BlogServiceModel serviceModel, bool save = true)
        {
            var newBlog = serviceModel.Blog;
            newBlog.CreateByUserId = serviceModel.User.Id;

            var entry = _context.BlogEntity.Add(newBlog);

            if(save == true)
                await _context.SaveChangesAsync();

            return entry.Entity;
        }

        public async Task<int> CreateBlogAsync(IEnumerable<BlogServiceModel> serviceModels)
        {
            foreach (var serviceModel in serviceModels)
            {
                var newBlog = await CreateBlogAsync(serviceModel, false);
            }
            
            return await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateBlogAsync(BlogServiceModel serviceModel)
        {
            var oldBlog = await AllBlog.FirstOrDefaultAsync(o => o.Id == serviceModel.Blog.Id);

            var blogEntry = _context.Entry(oldBlog);

            serviceModel.Blog.LastUpdateByUserId = serviceModel.User.Id;
            serviceModel.Blog.LastUpdateDate = DateTime.Now;

            blogEntry.CurrentValues.SetValues(serviceModel.Blog);

            _context.Entry(oldBlog).Property(o => o.CreateByUserId).IsModified = false;
            _context.Entry(oldBlog).Property(o => o.CreateDate).IsModified = false;

            foreach (var newDetail in serviceModel.Blog.Details)
            {
                var oldDetail = oldBlog.Details.FirstOrDefault(o => o.ForCurrentRequestLanguage());
                if (oldDetail.Language == newDetail.Language)
                {
                    newDetail.Id = oldDetail.Id;
                    _context.Entry(oldDetail).CurrentValues.SetValues(newDetail);
                }
            }

            _context.TryUpdateManyToMany(oldBlog.EntityFiles, serviceModel.Blog.EntityFiles, o => o.FileEntityId);

            var updateResultCount = await _context.SaveChangesAsync();

            return updateResultCount > 0;
        }

        public async Task<bool> DeleteBlogAsync(DeleteServiceModel serviceModel)
        {
            foreach (var id in serviceModel.Ids)
            {
                var oldBlog = await _context.BlogEntity.FindAsync(id);
                var blogEntry = _context.Entry(oldBlog);
                blogEntry.State = EntityState.Deleted;
            }

            var updateResultCount = await _context.SaveChangesAsync();

            return updateResultCount > 0;
        }
    }
}