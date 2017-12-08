using AutoMapper;
using Omi.Modules.Ecommerce.Product.Entities;
using Omi.Modules.Ecommerce.Product.ServiceModel;
using Omi.Modules.Ecommerce.Product.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Ecommerce.Product
{
    class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<ProductViewModel, ProductEntity>().ForMember(entity => entity.Id, (config) => {
                config.MapFrom(o => o.EntityId);
            });

            CreateMap<ProductEntity, ProductViewModel>().ForMember(viewModel => viewModel.EntityId, (config) => {
                config.MapFrom(o => o.Id);
            });

            CreateMap<ProductDetail, ProductViewModel>();
            CreateMap<ProductViewModel, ProductDetail>();

            CreateMap<ProductViewModel, ProductEditViewModel>();

            CreateMap<ProductFilterServiceModel, ProductGetViewModel>();
            CreateMap<ProductGetViewModel, ProductFilterServiceModel>();
        }
    }
}