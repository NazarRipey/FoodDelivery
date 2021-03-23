using AutoMapper;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using Microsoft.AspNetCore.Identity;

namespace FoodDelivery.Utilities.Mappers
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<UserProfileDTO, UserProfile>().ReverseMap();

			CreateMap<UserProfileDTO, IdentityUser>()
				.ForMember(d => d.UserName,
					opt => opt.MapFrom(src => src.Email))
				.ReverseMap();

			CreateMap<OwnerRequestDTO, OwnerRequest>()
				.ReverseMap();

			CreateMap<RestaurantTypeDTO, RestaurantType>()
				.ReverseMap();

			CreateMap<RestaurantAddressDTO, RestaurantAddress>()
				.ReverseMap();

			CreateMap<RestaurantDTO, Restaurant>()
				.ReverseMap();

			CreateMap<DishCategoryDTO, DishCategory>()
				.ReverseMap();

			CreateMap<DishDTO, Dish>()
				.ReverseMap();
		}
	}
}
