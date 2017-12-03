using Omi.Data;
using Omi.Modules.Ecommerce.Product.Entities;
using Omi.Modules.Ecommerce.Product.ViewModels;
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

            var taxonomyIds = new List<long>()
            {
                viewModel.BrandId
            };

            var taxonomies = taxonomyIds.Select(taxonomyId => new ProductTaxonomy {
                EntityId = viewModel.EntityId,
                TaxonomyId = taxonomyId
            });

            var files = new List<ProductFile>()
                {
                    new ProductFile
                    {
                        UsingType = (int)FileUsingType.Avatar,
                        FileEntityId = viewModel.Avatar.FileId,
                        EntityId = viewModel.EntityId,
                    },
                };

            product.Details = new List<ProductDetail>()
            {
                detail
            };

            product.EntityFiles = files;
            product.EntityTaxonomies = taxonomies;

            return new ProductServiceModel
            {
                Product = product
            };
        }
    }
}
