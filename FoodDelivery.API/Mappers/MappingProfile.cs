using AutoMapper;
using FoodDelivery.API.Models;
using FoodDelivery.DAL.EF.Entities;

namespace FoodDelivery.API.Mappers
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<SignUpModel, UserProfile>()
				.ReverseMap();
		}
	}
}
