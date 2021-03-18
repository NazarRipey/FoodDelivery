using System;
using System.Collections.Generic;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;

namespace FoodDelivery.DAL.Repositories
{
	public interface IRestaurantRepository
	{
		void Create(RestaurantDTO restaurantDTO);
		Restaurant GetByName(string name);
		ICollection<RestaurantTypeDTO> GetTypes();
		ICollection<RestaurantDTO> GetMyRestaurants(Guid ownerId);
	}
}
