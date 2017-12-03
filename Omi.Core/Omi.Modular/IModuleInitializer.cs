using Microsoft.Extensions.DependencyInjection;

namespace Omi.Modular
{
    public interface IModuleInitializer
    {
        int LoadOrder { get; set; }
        void Init(IServiceCollection services);
    }
}
