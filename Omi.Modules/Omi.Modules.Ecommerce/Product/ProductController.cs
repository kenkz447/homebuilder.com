﻿using Omi.Modules.ModuleBase;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Omi.Data;
using Omi.Base;
using Microsoft.AspNetCore.Mvc;
using Omi.Modules.Ecommerce.Product.Services;
using Omi.Modules.Ecommerce.Product.ViewModels;
using System.Linq;
using Omi.Modules.ModuleBase.ViewModels;
using Omi.Modules.Ecommerce.Product.ServiceModel;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Omi.Base.Collection;
using Omi.Modules.Ecommerce.Product.Entities;
using Omi.Base.ViewModel;
using System.Collections.Generic;
using Omi.Modules.ModuleBase.Base.ServiceModel;

namespace Omi.Modules.Ecommerce.Product
{
    public class ProductController : BaseController
    {
        public readonly ProductService _productService;
        public readonly ProductTaxonomiesService _productTaxonomiesService;

        public ProductController(
            ProductService productService,
            ProductTaxonomiesService productTaxonomiesService,
            ILogger<ProductController> logger, 
            UserManager<ApplicationUser> userManager) : base(logger, userManager)
        {
            _productService = productService;
            _productTaxonomiesService = productTaxonomiesService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<BaseJsonResult> Get(ProductGetViewModel viewModel)
        {
            var entityIds = new List<long>();
            if (viewModel.EntityId != default)
                entityIds.Add(viewModel.EntityId);

            var filterModel = AutoMapper.Mapper.Map<ProductFilterServiceModel>(viewModel);
            filterModel.Ids = entityIds;

            var products = _productService.GetProducts(filterModel);
            var baseJsonresult = new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED);

            if (viewModel.GetMode == (int)GetMode.Paginated)
            {
                var pageList = await PaginatedList<ProductEntity>.CreateAsync(products, viewModel.Page, viewModel.PageSize);
                var result = new PageEntityViewModel<ProductEntity, ProductViewModel>(pageList, entity => ProductViewModel.FromEntity(entity));
                baseJsonresult.Result = result;
            }
            else if(viewModel.GetMode == (int)GetMode.List)
            {
                var result = products.Select(o => ProductEditViewModel.FromEntity(o));
                baseJsonresult.Result = result;
            }
            else
            {
                var product = products.FirstOrDefault(o => o.Id == viewModel.EntityId);
                var result = new ProductEditViewModel();

                if (product != null)
                    result = ProductEditViewModel.FromEntity(product);

                if (viewModel.IsEditModel)
                {
                    var allBrand = _productTaxonomiesService.GetAllBrand();
                    var allType = _productTaxonomiesService.GetAllProductType();

                    result.AvaliableBrands = allBrand.Select(o => TaxomonyViewModel.FromEntity(o));
                    result.AvaliableProductTypes = allType.Select(o => TaxomonyViewModel.FromEntity(o));
                }

                baseJsonresult.Result = result;
            }

            return baseJsonresult;
        }

        [HttpPost]
        public async Task<BaseJsonResult> Create([FromBody]ProductViewModel viewModel)
        {
            var serviceModel = ProductServiceModel.FromViewModel(viewModel);
            serviceModel.User = CurrentUser;

            var entityResult = await _productService.CreateProductAsync(serviceModel);

            return new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED, entityResult.Id);
        }

        [HttpPut]
        public async Task<BaseJsonResult> Update([FromBody]ProductViewModel viewModel)
        {
            var serviceModel = ProductServiceModel.FromViewModel(viewModel);
            serviceModel.User = CurrentUser;

            await _productService.UpdateProductAsync(serviceModel);

            return new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED, viewModel.EntityId);
        }

        [HttpDelete]
        public async Task<BaseJsonResult> Delete([FromBody]EntityDeleteViewModel viewModel)
        {
            var serviceModel = new DeleteServiceModel
            {
                Ids = viewModel.Ids,
                DeleteBy = CurrentUser
            };

            var result = await _productService.DeleteProductAsync(serviceModel);

            return new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED, result);
        }
    }
}
