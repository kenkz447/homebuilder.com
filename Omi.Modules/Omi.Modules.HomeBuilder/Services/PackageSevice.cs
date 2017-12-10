using Microsoft.EntityFrameworkCore;
using Omi.Base.Collection;
using Omi.Extensions;
using Omi.Modules.FileAndMedia.Base;
using Omi.Modules.FileAndMedia.Entities;
using Omi.Modules.HomeBuilder.DbSeed;
using Omi.Modules.HomeBuilder.Entities;
using Omi.Modules.HomeBuilder.ServiceModel;
using Omi.Modules.ModuleBase.Base.ServiceModel;
using Omi.Modules.ModuleBase.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using static Omi.Modules.HomeBuilder.Utilities.ServiceUtilities;

namespace Omi.Modules.HomeBuilder.Services
{
    public class PackageService
    {
        private readonly HomeBuilderDbContext _context;
        public PackageService(HomeBuilderDbContext context)
        {
            _context = context;
        }

        public IEnumerable<TaxonomyEntity> GetAllDesignThemes()
            => _context.TaxonomyEntity.Include(o => o.Details).Where(o => o.TaxonomyTypeId == DesignThemeSeed.DesignTheme.Id).AsNoTracking();

        public IEnumerable<TaxonomyEntity> GetAllPackageIncludedItem()
            => _context.TaxonomyEntity.Include(o => o.Details).Where(o => o.TaxonomyTypeId == PackageIncludedSeed.PackageIncludedItem.Id).AsNoTracking();

        public IEnumerable<TaxonomyEntity> GetAllHouseStyles()
            => _context.TaxonomyEntity.Include(o => o.Details).Where(o => o.TaxonomyTypeId == HouseStyleSeed.HouseStyle.Id).AsNoTracking();

        public IEnumerable<TaxonomyEntity> GetAllFurnitureIncludeItem()
            => _context.TaxonomyEntity.Include(o => o.Details).Where(o => o.TaxonomyTypeId == PackageFunitureIncludedSeed.PackageFunitureIncludedItem.Id).AsNoTracking();

        private IQueryable<Package> GetPackages()
            => _context.Package
            .Include(o => o.Details)
            .Include(o => o.EntityFiles)
            .ThenInclude(o => o.FileEntity)
            .Include(o => o.EntityTaxonomies)
            .ThenInclude(o => o.Taxonomy)
            .ThenInclude(o => o.Details)
            .Include(o => o.EntityProducts).ThenInclude(o => o.Product).ThenInclude(o => o.Details)
            .Include(o => o.EntityProducts).ThenInclude(o => o.Product).ThenInclude(o => o.EntityTaxonomies).ThenInclude(o => o.Taxonomy).ThenInclude(o => o.Details)
            .Include(o => o.EntityProducts).ThenInclude(o => o.Product).ThenInclude(o => o.EntityFiles).ThenInclude(o => o.FileEntity)
            .AsQueryable();


        public IEnumerable<Package> GetPackageByIds(IEnumerable<long> ids)
        {
            var result = GetPackages().Where(o => ids.Contains(o.Id)).AsNoTracking();
            return result;
        }

        public IQueryable<Package> GetPackages(PackageFilterServiceModel serviceModel)
        {
            var packages = GetPackages().AsNoTracking();

            foreach (var taxonomyId in serviceModel.TaxonomyIds)
                if(taxonomyId != default)
                    packages = packages.Where(o => o.EntityTaxonomies.Select(e => e.TaxonomyId).Contains(taxonomyId));

            if (serviceModel.BudgetMin != default)
                packages = packages.Where(o => o.Details.FirstOrDefault(e => e.ForCurrentRequestLanguage()).Price >= serviceModel.BudgetMin);

            if (serviceModel.BudgetMax != default)
                packages = packages.Where(o => o.Details.FirstOrDefault(e => e.ForCurrentRequestLanguage()).Price <= serviceModel.BudgetMax);

            if (serviceModel.GetTypes != null)
            {
                if(serviceModel.GetTypes.Contains("perspective"))
                    packages = packages.Where(o => o.IsPerspective == true);
                if (serviceModel.GetTypes.Contains("non-perspective"))
                    packages = packages.Where(o => o.IsPerspective != true);
            }

            packages = packages.OrderByDescending(o => o.Id);

            return packages;
        }

        public async Task<Package> GetNextPackage(long packageId)
            => await GetPackages().AsNoTracking().FirstOrDefaultAsync(o => o.Id > packageId);

        public async Task<Package> GetPrevPackage(long packageId)
            => await GetPackages().AsNoTracking().Where(o => o.Id < packageId).OrderByDescending(o => o.Id).FirstOrDefaultAsync();

        public async Task<Package> GetPackageById(long packageId)
            => await GetPackages().AsNoTracking().SingleAsync(o => o.Id == packageId);

        public async Task<Package> GetPackageByName(string packageName)
            => await GetPackages().AsNoTracking().SingleAsync(o => o.Name == packageName);

        public async Task<Package> CreateNewPackage(PackageServiceModel serviceModel)
        {
            var newPackage = new Package
            {
                Name = serviceModel.Name,
                CreateByUserId = serviceModel.User.Id,
                Details = new List<PackageDetail>() {
                    serviceModel.Detail
                },
                EntityFiles = serviceModel.GetEntityFiles(),
                EntityTaxonomies = new List<PackageTaxonomy>(
                    serviceModel.TaxonomyIds.Select(taxonomyId => new PackageTaxonomy { TaxonomyId = taxonomyId })),
                EntityProducts = serviceModel.PackageProducts
            };

            var add = await _context.Package.AddAsync(newPackage);

            _context.SaveChanges();

            return add.Entity;
        }

        public async Task<Package> UpdatePackageAsync(PackageServiceModel serviceModel)
        {
            var package = await GetPackages().SingleAsync(o => o.Id == serviceModel.Id);
            var newPackage = serviceModel.ToEntity();

            _context.Entry(package).CurrentValues.SetValues(newPackage);
            _context.Entry(package).Property(o => o.Name).IsModified = false;
            _context.Entry(package).Property(o => o.CreateByUserId).IsModified = false;
            _context.Entry(package).Property(o => o.CreateDate).IsModified = false;

            foreach (var newDetail in newPackage.Details)
            {
                var oldDetail = package.Details.FirstOrDefault(o => o.Language == newDetail.Language);
                if (oldDetail.Language == newDetail.Language)
                {
                    newDetail.Id = oldDetail.Id;
                    _context.Entry(oldDetail).CurrentValues.SetValues(newDetail);
                }
            }

            _context.TryUpdateManyToMany(package.EntityFiles, newPackage.EntityFiles, o => o.FileEntityId);
            _context.TryUpdateManyToMany(package.EntityTaxonomies, newPackage.EntityTaxonomies, o => o.TaxonomyId);

            _context.TryUpdateManyToMany(package.EntityProducts, newPackage.EntityProducts, o => o.ProductId);
            foreach (var entityProduct in package.EntityProducts)
            {
                var pdEntry = _context.Entry(entityProduct);
                pdEntry.Property(o => o.Quantity).CurrentValue = newPackage.EntityProducts.FirstOrDefault(o => o.ProductId == entityProduct.ProductId).Quantity;
            }

            await _context.SaveChangesAsync();

            return newPackage;
        }

        public async Task<bool> DeleteProductAsync(DeleteServiceModel serviceModel)
        {
            foreach (var id in serviceModel.Ids)
            {
                var oldProduct = await _context.Package.FindAsync(id);
                var productEntry = _context.Entry(oldProduct);
                productEntry.State = EntityState.Deleted;
            }

            var updateResultCount = await _context.SaveChangesAsync();

            return updateResultCount > 0;
        }
    }
}