using Omi.Extensions;
using Omi.Modules.Ecommerce.Product.Entities;
using Omi.Modules.FileAndMedia.Base;
using Omi.Modules.FileAndMedia.ViewModel;
using Omi.Modules.ModuleBase.ViewModels;
using System.Linq;

namespace Omi.Modules.Ecommerce.Product.ViewModels
{
    public class ProductViewModel
    {
        public long EntityId { get; set; }

        public string Title { get; set; }

        public int Price { get; set; }

        public long BrandId { get; set; }

        public TaxomonyViewModel Brand { get; set; }

        public FileEntityInfo Avatar { get; set; }

        public static ProductViewModel FromEntity(ProductEntity entity)
        {
            var productEntityDetail = entity.Details.First();

            var viewModelFromProduct = AutoMapper.Mapper.Map<ProductViewModel>(entity);
            var viewModelFromProductDetail = AutoMapper.Mapper.Map<ProductViewModel>(productEntityDetail);

            var viewModel = viewModelFromProduct.MergeWith(viewModelFromProductDetail);

            var brand = entity.EntityTaxonomies.FirstOrDefault(o => o.Taxonomy.TaxonomyTypeId == Seed.BaseBrandSeed.ProductBrand.Id).Taxonomy;
            viewModel.Brand = TaxomonyViewModel.FromEntity(brand);

            var avatar = entity.EntityFiles.FirstOrDefault(o => o.UsingType == (int)FileUsingType.Avatar).FileEntity;
            viewModel.Avatar = FileEntityInfo.FromEntity(avatar);

            return viewModel;
        }
    }
}