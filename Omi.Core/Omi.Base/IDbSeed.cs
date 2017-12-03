using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Omi.Base
{
    public interface IDbSeed
    {
        Task SeedAsync(DbContext dbConext);
    }
}
