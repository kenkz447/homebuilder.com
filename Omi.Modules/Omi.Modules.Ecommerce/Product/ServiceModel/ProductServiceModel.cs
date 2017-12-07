using Omi.Data;
using Omi.Extensions;
using Omi.Modules.Ecommerce.Product.Entities;
using Omi.Modules.Ecommerce.Product.ViewModels;
using Omi.Modules.Ecommerce.Seed;
using Omi.Modules.FileAndMedia.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Omi.Modules.Ecommerce.Product.ServiceModel
{
    public class ProductServiceModel
    {
        public ProductEntity Product { get; set; }
        public ApplicationUser User { get; set; }

        public static ProductServiceModel FromViewModel(ProductViewModel viewModel)
        {
            var product = AutoMapper.Mapper.Map<ProductEntity>(viewModel);
            var detail = AutoMapper.Mapper.Map<ProductDetail>(viewModel);

            if (viewModel.BrandId == default)
                viewModel.BrandId = BaseBrandSeed.Uncategorized.Id;

            if (viewModel.TypeId == default)
                viewModel.BrandId = BaseProductTypeSeed.Uncategorized.Id;

            var taxonomyIds = new List<long>()
            {
                viewModel.BrandId,
                viewModel.TypeId
            };

            var taxonomies = taxonomyIds.Select(taxonomyId => new ProductTaxonomy {
                EntityId = viewModel.EntityId,
                TaxonomyId = taxonomyId
            });

            var files = new List<ProductFile>();

            if (viewModel.Avatar != null)
                files.Add(new ProductFile
                {
                    UsingType = (int)FileUsingType.Avatar,
                    FileEntityId = viewModel.Avatar.FileId,
                    EntityId = viewModel.EntityId,
                });

            if (viewModel.Pictures != null)
                files.AddRange(viewModel.Pictures.Select(picture => new ProductFile
                {
                    UsingType = (int)FileUsingType.Picture,
                    FileEntityId = picture.FileId,
                    EntityId = viewModel.EntityId,
                }));

            product.Name = viewModel.Title.ToEntityName();
            product.Details = new List<ProductDetail>()
            {
                detail
            };

            product.EntityFiles = files;
            product.EntityTaxonomies = taxonomies.ToList();

            return new ProductServiceModel
            {
                Product = product
            };
        }
    }
}
