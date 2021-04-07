using AutoMapper;
using FoodDelivery.API.Models;
using FoodDelivery.Entities.DTO;

namespace FoodDelivery.API.Mappers
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<SignUpModel, UserProfileDTO>()
				.ReverseMap();
		}
	}
}
