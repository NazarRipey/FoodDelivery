using System;
using FoodDelivery.Entities.DTO;

namespace FoodDelivery.DAL.Repositories
{
	public interface IRestaurantAddressRepository
	{
		void Add(RestaurantAddressDTO restaurantAddressDTO);
		void Remove(Guid restaurantAddressId);
	}
}
