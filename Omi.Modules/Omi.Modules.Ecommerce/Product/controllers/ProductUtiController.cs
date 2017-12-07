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

namespace Omi.Modules.Ecommerce.Product.controllers
{
    public class ProductUtiController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public ProductUtiController(
            IHostingEnvironment hostingEnvironment,
            ILogger<ProductUtiController> logger,
            UserManager<ApplicationUser> userManager) : base(logger, userManager)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        private void Insert(FileInfo file)
        {
            using (var package = new ExcelPackage(file))
            {
                var worksheet = package.Workbook.Worksheets.FirstOrDefault();
                if (worksheet == null)
                    return;

                var rowCount = worksheet.Dimension.Rows;
                var ColCount = worksheet.Dimension.Columns;
                
                for (int row = 1; row <= rowCount; row++)
                {
                    for (int col = 1; col <= ColCount; col++)
                    {

                    }
                }
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
