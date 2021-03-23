using System;
using System.Collections.Generic;
using FoodDelivery.Entities.DTO;

namespace FoodDelivery.BusinessLogic.Facades
{
	public interface IRestaurantFacade
	{
		void Create(RestaurantDTO restaurantDTO);
		RestaurantDTO GetByName(string name);
		ICollection<RestaurantTypeDTO> GetTypes();
		ICollection<RestaurantDTO> GetMyRestaurants(Guid ownerId);
		ICollection<RestaurantDTO> GetAll();
		ICollection<RestaurantDTO> GetTop(int count);
		void Update(RestaurantDTO restaurantDTO);
		void AddAddress(RestaurantAddressDTO restaurantAddressDTO);
		void RemoveAddress(Guid restaurantAddressId);
		void RemoveRestaurant(Guid restaurantId);
		string GetNameById(Guid id);
		ICollection<string> GetAllNames();
	}
}
