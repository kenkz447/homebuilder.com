using Microsoft.EntityFrameworkCore;
using Omi.Extensions;
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

        public TaxonomyEntity GetBrandByLabel(string brandLabel)
        {
            var brandEntityName = $"product-brand-{brandLabel.ToEntityName()}";
            return _context.TaxonomyEntity.FirstOrDefault(o => o.Name == brandEntityName);
        }

        public TaxonomyEntity AddBrand(string brandLabel, bool save = true)
        {
            var brandEntityName = $"product-brand-{brandLabel.ToEntityName()}";
            var newBrand = new TaxonomyEntity
            {
                Name = brandEntityName,
                TaxonomyTypeId = Seed.BaseBrandSeed.ProductBrand.Id,
                Details = new List<TaxonomyDetail>
                {
                    new TaxonomyDetail
                    {
                        Label = brandLabel,
                        Language = "vi"
                    }
                }
            };

            var entry = _context.TaxonomyEntity.Add(newBrand);

            if (save)
                _context.SaveChanges();

            return entry.Entity;
        }

        public TaxonomyEntity GetProductTypeByLabel(string typeLabel)
        {
            var brandEntityName = $"product-type-{typeLabel.ToEntityName()}";
            return _context.TaxonomyEntity.FirstOrDefault(o => o.Name == brandEntityName);
        }

        public TaxonomyEntity AddProductType(string typeLabel, bool save = true)
        {
            var brandEntityName = $"product-type-{typeLabel.ToEntityName()}";
            var newType = new TaxonomyEntity
            {
                Name = brandEntityName,
                TaxonomyTypeId = Seed.BaseProductTypeSeed.ProductType.Id,
                Details = new List<TaxonomyDetail>
                {
                    new TaxonomyDetail
                    {
                        Label = typeLabel,
                        Language = "vi"
                    }
                }
            };

            var entry = _context.TaxonomyEntity.Add(newType);

            if(save)
                _context.SaveChanges();

            return entry.Entity;
        }
    }
}