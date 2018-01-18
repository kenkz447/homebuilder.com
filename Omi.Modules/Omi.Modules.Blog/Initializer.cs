using Omi.Modular;
using Microsoft.Extensions.DependencyInjection;
using Omi.Modules.Blog.Services;

namespace Omi.Modules.Blog
{
    public class BlogInitializer : IModuleInitializer
    {
        public int LoadOrder { get; set; }
        public BlogInitializer()
        {
            LoadOrder = 0;
        }

        public void Init(IServiceCollection services)
        {
            services.AddDbContext<BlogDbContext>();
            services.AddScoped<BlogService>();
        }
    }
}