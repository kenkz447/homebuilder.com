using Microsoft.EntityFrameworkCore;

namespace Omi.Modular
{
    public interface ICustomModelBuilder
    {
        void Build(ModelBuilder builder);
    }
}
