using Omi.Modules.Ecommerce.Product.Entities;
using Omi.Modules.ModuleBase.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Ecommerce.Product.ViewModels
{
    public class ProductEditViewModel : ProductViewModel
    {
        public IEnumerable<TaxomonyViewModel> AvaliableBrands { get; set; }
        public IEnumerable<TaxomonyViewModel> AvaliableProductTypes { get; set; }

        public static new ProductEditViewModel FromEntity(ProductEntity entity)
        {
            var baseViewModel = ProductViewModel.FromEntity(entity);

            var viewModel = AutoMapper.Mapper.Map<ProductEditViewModel>(baseViewModel);

            return viewModel;
        }
    }
}