using Omi.Extensions;
using Omi.Modules.Ecommerce.Product.Entities;
using Omi.Modules.FileAndMedia.Base;
using Omi.Modules.FileAndMedia.ViewModel;
using Omi.Modules.ModuleBase.ViewModels;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Omi.Modules.Ecommerce.Product.ViewModels
{
    public class ProductViewModel
    {
        [DefaultValue(0)]
        public long EntityId { get; set; }

        public string Name { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }
        public string Code { get; set; }
        public string Dimension { get; set; }

        public int Price { get; set; }

        [Required, DefaultValue(0)]
        public long BrandId { get; set; }
        
        public TaxomonyViewModel Brand { get; set; }

        [Required, DefaultValue(0)]
        public long TypeId { get; set; }

        public TaxomonyViewModel Type { get; set; }

        //[Required]
        public FileEntityInfo Avatar { get; set; }

        public IEnumerable<FileEntityInfo> Pictures { get; set; }

        public static ProductViewModel FromEntity(ProductEntity entity)
        {
            var productEntityDetail = entity.Details.First();

            var viewModelFromProduct = AutoMapper.Mapper.Map<ProductViewModel>(entity);
            var viewModelFromProductDetail = AutoMapper.Mapper.Map<ProductViewModel>(productEntityDetail);

            var viewModel = viewModelFromProduct.MergeWith(viewModelFromProductDetail);

            var brand = entity.EntityTaxonomies.FirstOrDefault(o => o.Taxonomy.TaxonomyTypeId == Seed.BaseBrandSeed.ProductBrand.Id)?.Taxonomy;
            if(brand != null)
            {
                viewModel.Brand = TaxomonyViewModel.FromEntity(brand);
                viewModel.BrandId = brand.Id;
            }

            var type = entity.EntityTaxonomies.FirstOrDefault(o => o.Taxonomy.TaxonomyTypeId == Seed.BaseProductTypeSeed.ProductType.Id)?.Taxonomy;
            if(type != null)
            {
                viewModel.Type = TaxomonyViewModel.FromEntity(type);
                viewModel.TypeId = type.Id;
            }

            var avatar = entity.EntityFiles.FirstOrDefault(o => o.UsingType == (int)FileUsingType.Avatar)?.FileEntity;
            if(avatar != null)
                viewModel.Avatar = FileEntityInfo.FromEntity(avatar);

            var pictures = entity.EntityFiles.Where(o => o.UsingType == (int)FileUsingType.Picture);
            viewModel.Pictures = pictures.Select(picture => FileEntityInfo.FromEntity(picture.FileEntity));

            return viewModel;
        }
    }
}