using Omi.Base;
using Omi.Modules.Setting.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Omi.Modules.Setting.ServiceModels;
using Omi.Extensions;
using System.Linq;
using System.Threading.Tasks;
using System.Globalization;
using System.Threading;

namespace Omi.Modules.Setting.Services
{
    public class SettingService 
    {
        public SettingDbContext _context { get; set; }

        public SettingService(SettingDbContext context)
        {
            _context = context;
        }

        public SettingEntity Create<TCreateModel>(TCreateModel serviceModel)
        {
            throw new NotImplementedException();
        }

        public bool Delete<TDeleteModel>(TDeleteModel serviceModel)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<SettingEntity> GetEntities<TGetModel>(TGetModel serviceModel)
        {
            throw new NotImplementedException();
        }

        public async Task<SettingEntity> Get(GetSettingServiceModel serviceModel)
        {
            var settingEntity = await _context.SettingEntity
                .Include(o => o.SettingValues)
                .AsNoTracking()
                .FirstOrDefaultAsync(o => (serviceModel.Id != default) ? o.Id == serviceModel.Id : o.Name == serviceModel.Name);

            settingEntity.SettingValues = settingEntity.SettingValues.Where(o => o.ForCurrentRequestLanguage());

            return settingEntity;
        }


        public async Task<int> Update(UpdateSettingServiceModel serviceModel)
        {
            var exitsEntity = await _context.SettingEntity.Include(o => o.SettingValues).SingleAsync(o => 
                (serviceModel.Id != default) ? o.Id == serviceModel.Id : o.Name == serviceModel.Name);

            _context.Entry(exitsEntity).CurrentValues.SetValues(new SettingEntity
            {
                Id = exitsEntity.Id,
                Name = exitsEntity.Name,
                LastUpdateByUser = serviceModel.UpdateBy,
                LastUpdateDate = DateTime.Now
            });

            var currentLanguage = Thread.CurrentThread.CurrentCulture.Name;

            var filteredValues = exitsEntity.SettingValues.Where(o => o.ForCurrentRequestLanguage());
            var excludeProperties = new List<String>
            {
                nameof(SettingValue.Language),
                nameof(SettingValue.SettingEntityId)
            };

            _context.TryUpdateList(filteredValues, serviceModel.SettingValues, o => o.Id, excludeProperties);

            var resultCount = await _context.SaveChangesAsync();

            return resultCount;
        }
    }
}