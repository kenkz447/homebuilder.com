using Omi.Modules.ModuleBase;
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
        public BaseJsonResult Get(ProductGetViewModel viewModel)
        {
            var filterModel = new BaseFilterServiceModel<long> {
                Ids = new[] { viewModel.Id }
            };

            var products = _productService.GetProducts(filterModel);
            var baseJsonresult = new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED);

            if (viewModel.GetMode == (int)GetMode.Multi)
                baseJsonresult.Result = products.Select(o => ProductViewModel.FromEntity(o));
            else
            {
                var product = products.First();
                var result = ProductEditViewModel.FromEntity(product);

                if (viewModel.IsEditModel)
                {
                    var allBrand = _productTaxonomiesService.GetAllBrand();
                    result.AvaliableBrands = allBrand.Select(o => TaxomonyViewModel.FromEntity(o));
                }

                baseJsonresult.Result = result;
            }

            return baseJsonresult;
        }

        [HttpPost]
        public async Task<BaseJsonResult> Create(ProductViewModel viewModel)
        {
            var serviceModel = ProductServiceModel.FromViewModel(viewModel);
            var entityResult = await _productService.CreateProductAsync(serviceModel);

            var result = ProductViewModel.FromEntity(entityResult);

            return new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED, result);
        }

        [HttpPut]
        public async Task<BaseJsonResult> Update(ProductViewModel viewModel)
        {
            var serviceModel = ProductServiceModel.FromViewModel(viewModel);
            var result = await _productService.UpdateProductAsync(serviceModel);

            return new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED, result);
        }

        [HttpDelete]
        public async Task<BaseJsonResult> Delete(ProductViewModel viewModel)
        {
            var serviceModel = ProductServiceModel.FromViewModel(viewModel);
            var result = await _productService.DeleteProductAsync(serviceModel);

            return new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED, result);
        }
    }
}
