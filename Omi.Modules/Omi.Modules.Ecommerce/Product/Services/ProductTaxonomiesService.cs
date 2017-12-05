using Microsoft.EntityFrameworkCore;
using Omi.Modules.ModuleBase.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Omi.Modules.Ecommerce.Product.Services
{
    public class ProductTaxonomiesService
    {
        private readonly EcommerceDbContext _context;

        public ProductTaxonomiesService(EcommerceDbContext context)
        {
            _context = context;
        }

        public IEnumerable<TaxonomyEntity> GetAllBrand()
            => _context.TaxonomyEntity.Include(o => o.Details).Where(o => o.TaxonomyTypeId == Seed.BaseBrandSeed.ProductBrand.Id).AsNoTracking();

        public IEnumerable<TaxonomyEntity> GetAllProductType()
            => _context.TaxonomyEntity.Include(o => o.Details).Where(o => o.TaxonomyTypeId == Seed.BaseProductTypeSeed.ProductType.Id).AsNoTracking();
    }
}