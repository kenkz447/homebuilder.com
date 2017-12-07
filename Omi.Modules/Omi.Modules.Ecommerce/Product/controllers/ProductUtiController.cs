using Omi.Modules.ModuleBase;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Omi.Data;
using Microsoft.AspNetCore.Hosting;
using Omi.Base;
using System.IO;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Omi.Modules.Ecommerce.Product.ViewModels;
using Omi.Modules.Ecommerce.Product.Services;
using Omi.Extensions;
using Omi.Modules.ModuleBase.ViewModels;
using Omi.Modules.Ecommerce.Product.ServiceModel;

namespace Omi.Modules.Ecommerce.Product.controllers
{
    public class ProductUtiController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly ProductService _productService;
        private readonly ProductTaxonomiesService _productTaxonomiesService;

        public ProductUtiController(
            IHostingEnvironment hostingEnvironment,
            ProductService productService,
            ProductTaxonomiesService productTaxonomiesService,
            ILogger<ProductUtiController> logger,
            UserManager<ApplicationUser> userManager) : base(logger, userManager)
        {
            _hostingEnvironment = hostingEnvironment;
            _productService = productService;
            _productTaxonomiesService = productTaxonomiesService;
        }

        private async void Insert(FileInfo file)
        {
            using (var package = new ExcelPackage(file))
            {
                var worksheet = package.Workbook.Worksheets.FirstOrDefault();
                if (worksheet == null)
                    return;

                var rowCount = worksheet.Dimension.Rows;
                var ColCount = worksheet.Dimension.Columns;
                var productSeriviceCollection = new List<ProductServiceModel>();
                var products = _productService.GetProducts(new BaseFilterServiceModel<long>());

                for (int row = 2; row <= rowCount; row++)
                {
                    var productTitle = worksheet.Cells[row, 2].Value?.ToString();
                    var productName = productTitle.ToEntityName();
                    var existProduct = products.FirstOrDefault(o => o.Name == productName);
                    if (existProduct != null)
                        continue;

                    var productViewModel = new ProductViewModel()
                    {
                        Code = worksheet.Cells[row, 1].Value?.ToString(),
                        Title = productTitle,
                        Description = worksheet.Cells[row, 5].Value?.ToString(),
                        Dimension = worksheet.Cells[row, 6].Value?.ToString(),
                    };

                    var price = worksheet.Cells[row, 7].Value?.ToString().Replace(".", string.Empty);
                    if (!string.IsNullOrEmpty(price))
                        productViewModel.Price = int.Parse(price);

                    var brandLabel = worksheet.Cells[row, 3].Value?.ToString();
                    if (!string.IsNullOrEmpty(brandLabel))
                    {
                        var brand = _productTaxonomiesService.GetBrandByLabel(brandLabel);
                        if (brand == null)
                            brand = _productTaxonomiesService.AddBrand(brandLabel, false);

                        productViewModel.BrandId = brand.Id;
                    }

                    var typeLabel = worksheet.Cells[row, 4].Value?.ToString();
                    if (!string.IsNullOrEmpty(typeLabel))
                    {
                        var type = _productTaxonomiesService.GetProductTypeByLabel(typeLabel);
                        if (type == null)
                            type = _productTaxonomiesService.AddProductType(typeLabel, false);

                        productViewModel.TypeId = type.Id;
                    }

                    var serviceModel = ProductServiceModel.FromViewModel(productViewModel);
                    serviceModel.User = CurrentUser;
                    productSeriviceCollection.Add(serviceModel);
                }

                await _productService.CreateProductAsync(productSeriviceCollection);
            }
        }

        [HttpPost]
        public async Task<BaseJsonResult> Import()
        {
            var files = Request.Form.Files;
            long size = files.Sum(f => f.Length);

            // full path to file in temp location
            var filePath = Path.GetTempFileName();

            string sWebRootFolder = _hostingEnvironment.WebRootPath;
            string sFileName = @"demo.xlsx";
            var savePath = Path.Combine(sWebRootFolder, "temp", sFileName);
            FileInfo file = null;

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                    using (var stream = new FileStream(savePath, FileMode.OpenOrCreate))
                    {
                        await formFile.CopyToAsync(stream);
                        file = new FileInfo(savePath);
                    }
            }

            if(file != null)
                Insert(file);

            return new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED);
        }
    }
}
