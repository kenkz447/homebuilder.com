using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Omi.Data;
using System.IO;

namespace Omi.DatabaseDesign
{
    public class OmiDbContextFactory : IDesignTimeDbContextFactory<OmiDbContext>
    {
        public OmiDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var builder = new DbContextOptionsBuilder<OmiDbContext>();
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            builder.UseSqlServer(connectionString);
            return new OmiDbContext(builder.Options);
        }
    }
}
