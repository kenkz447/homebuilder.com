using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Omi.Base;
using Omi.Data;
using Omi.Modules.FileAndMedia.Entities;
using Omi.Modules.FileAndMedia.Misc;
using Omi.Modules.FileAndMedia.ServiceModels;
using Omi.Modules.ModuleBase.Base.ServiceModel;
using SixLabors.Primitives;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System;
using System.Linq;

namespace Omi.Modules.FileAndMedia.Services
{
    public class FileService
    {
        private readonly IHostingEnvironment _environment;
        private readonly FileAndMediaDbContext _context;

        private static DirectoryInfo _webRootDirectoryInfo;
        private DirectoryInfo WebRootDirectoryInfo
        {
            get
            {
                if (_webRootDirectoryInfo != null)
                    return _webRootDirectoryInfo;
                return _webRootDirectoryInfo = new DirectoryInfo(_environment.WebRootPath);
            }
        }

        public FileService(FileAndMediaDbContext context,IHostingEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public async Task<IEnumerable<FileEntity>> Upload(IFormFileCollection files, ApplicationUser uploader = null)
        {
            var uploadDirectory = WebRootDirectoryInfo.ToString();
            var currentYear = DateTime.UtcNow.Year.ToString();
            var currentMonth = DateTime.UtcNow.Month.ToString();

            var uploadedFiles = new List<FileEntity>();
            foreach (var file in files)
            {
                var fileLength = file.Length;
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.ToString().Trim('"');
                var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(fileName);
                var fileExtension = Path.GetExtension(fileName);

                var rawPath = Path.Combine("Upload", uploader?.Id ?? "unknow", currentYear, currentMonth);

                var destinationFolderPath = Path.Combine(uploadDirectory, rawPath);
                if (!Directory.Exists(destinationFolderPath))
                    Directory.CreateDirectory(destinationFolderPath);

                var fileSavePath = Path.Combine(destinationFolderPath, fileName);
                using (var fileStream = File.Create(fileSavePath))
                {
                    await file.CopyToAsync(fileStream);
                    fileStream.Flush();
                }

                var fileMeta = new FileMeta();

                var fileType = FileUtilities.GetFileType(fileName);

                if (fileType == FileType.Image)
                {
                    fileMeta.Dimension = FileUtilities.GetImageDimension(fileSavePath).ToString();
                    fileMeta.ImageAlt = fileNameWithoutExtension;

                    var thumbFileName = $"{fileNameWithoutExtension}_thumb{fileExtension}";
                    var thumbFilePath = Path.Combine(destinationFolderPath, thumbFileName);

                    var imageCropResult = FileUtilities.CropThumbnail(fileSavePath, thumbFilePath, new Size(150, 150));
                    if (imageCropResult)
                        fileMeta.ThumbnailFileName = thumbFileName;
                }

                var fileURI = "/" + Path.Combine(rawPath, fileName).Replace("\\", "/");

                var fileEntity = new FileEntity
                {
                    Src = fileURI,
                    Size = fileLength,
                    MetaJson = fileMeta.ToJsonString(),
                    FileType = (int)fileType,
                    CreateByUserId = uploader.Id
                };

                _context.FileEntity.Add(fileEntity);
                await _context.SaveChangesAsync();

                uploadedFiles.Add(fileEntity);
            }

            return uploadedFiles;
        }

        public IEnumerable<FileEntity> GetFileEntities(FileEntityFilterServiceModel model)
        {
            // TODO: Filter;

            var entities = _context.FileEntity.AsNoTracking();

            entities = entities.OrderByDescending(o => o.Id);

            return entities;
        }

        public async Task<bool> Delete(BaseDeleteServiceModel model)
        {
            // TODO: Check role of the User before do anything;

            var fileEntity = await _context.Set<FileEntity>().FindAsync(model.EntityId);

            if (fileEntity == null)
                return false;

            _context.Remove(fileEntity);
            var result = await _context.SaveChangesAsync();

            return result > 0;
        }
    }
}
