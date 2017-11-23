using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Omi.Modular
{
    public interface IDbSeed
    {
        Task SeedAsync(DbContext dbConext);
    }
}
