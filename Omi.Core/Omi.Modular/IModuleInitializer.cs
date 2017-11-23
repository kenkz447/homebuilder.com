using Microsoft.Extensions.DependencyInjection;

namespace Omi.Modular
{
    public interface IModuleInitializer
    {
        void Init(IServiceCollection services);
    }
}
