using AutoMapper;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Dish;
using FoodDelivery.Entities.DTO.Order;
using FoodDelivery.Entities.DTO.Restaurant;
using FoodDelivery.Entities.Enums;
using FoodDelivery.Entities.Enums.Status;
using Microsoft.AspNetCore.Identity;

namespace FoodDelivery.Utilities.Mappers
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<UserProfile, IdentityUser>()
				.ForMember(d => d.UserName,
					opt => opt.MapFrom(src => src.Email))
				.ReverseMap();

			CreateMap<UserProfile, UserShortProfileDTO>()
				.ForMember(d => d.FullName,
					opt => opt.MapFrom(src => src.FirstName + " " + src.LastName))
				.ReverseMap();

			CreateMap<OwnerRequestDTO, OwnerRequest>()
				.ReverseMap();

			CreateMap<Dish, DishUpdateDTO>();

			CreateMap<DishCategoryDTO, DishCategory>()
				.ReverseMap();

			CreateMap<DishListDTO, Dish>()
				.ReverseMap();

			CreateMap<Dish, DishAddDTO>()
				.ReverseMap();

			CreateMap<Dish, DishCartDTO>()
				.ForMember(d => d.RestaurantName,
					opt => opt.MapFrom(src => src.Restaurant.Name))
				.ReverseMap();

			CreateMap<Dish, DishOrderDTO>()
			.ForMember(d => d.RestaurantName,
				opt => opt.MapFrom(src => src.Restaurant.Name))
			.ReverseMap();

			CreateMap<Dish, DishDetailDTO>()
				.ForMember(d => d.Status, opt =>
				{
					opt.MapFrom(ds => (DishStatus)ds.Status);
				})
				.ForMember(d => d.RestaurantName, opt =>
				{
					opt.MapFrom(src => src.Restaurant.Name);
				})
				.ReverseMap();

			CreateMap<RestaurantTypeDTO, RestaurantType>()
				.ReverseMap();

			CreateMap<RestaurantAddressDTO, RestaurantAddress>()
				.ReverseMap();

			CreateMap<RestaurantAddDTO, Restaurant>()
				.ReverseMap();

			CreateMap<Restaurant, RestaurantDetailDTO>()
				.ForMember(d => d.Status, opt =>
				{
					opt.MapFrom(r => (RestaurantStatus)r.Status);
				})
				.ReverseMap();

			CreateMap<Restaurant, RestaurantOwnerDetailDTO>()
				.ForMember(d => d.Status, opt =>
				{
					opt.MapFrom(r => (RestaurantStatus)r.Status);
				})
				.ReverseMap();

			CreateMap<RestaurantListDTO, Restaurant>()
				.ReverseMap();

			CreateMap<Restaurant, RestaurantUpdateDTO>();

			CreateMap<RestaurantRequest, RestaurantRequestDTO>()
				.ForMember(d => d.Name,
				opt => opt.MapFrom(r => r.Restaurant.Name))
				.ForMember(d => d.Type,
				opt => opt.MapFrom(r => r.Restaurant.Type))
				.ReverseMap();


			CreateMap<CartItem, CartItemDTO>()
				.ReverseMap();

			CreateMap<Order, AvailableOrderDTO>()
			.ForMember(d => d.CustomerName, opt =>
			{
				opt.MapFrom(src => src.UserProfile.FirstName + " " + src.UserProfile.LastName);
			})
			.ReverseMap();

			CreateMap<Order, OrderDetailDTO>()
			.ForMember(d => d.PaymentType, opt =>
			{
				opt.MapFrom(o => (PaymentType)o.PaymentType);
			})
			.ForMember(d => d.Status, opt =>
			{
				opt.MapFrom(o => (OrderStatus)o.Status);
			})
			.ReverseMap();

			CreateMap<Order, OrderManagerDTO>()
			.ForMember(d => d.Status, opt =>
			{
				opt.MapFrom(o => (OrderStatus)o.Status);
			})
			.ForMember(d => d.CustomerName, opt =>
			{
				opt.MapFrom(src => src.UserProfile.FirstName + " " + src.UserProfile.LastName);
			})
			.ReverseMap();

			CreateMap<Order, UpdateOrderDTO>();

			CreateMap<Order, OrderShortDTO>()
			.ForMember(d => d.Status, opt =>
			{
				opt.MapFrom(o => (OrderStatus)o.Status);
			})
			.ReverseMap();

			CreateMap<OrderItem, OrderItemDTO>()
				.ReverseMap();
		}
	}
}
