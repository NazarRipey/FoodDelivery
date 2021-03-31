using System;
using System.Collections.Generic;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.BusinessLogic.Facades
{
	public interface IRestaurantFacade
	{
		void Create(RestaurantDetailDTO restaurantDTO);
		RestaurantDetailDTO GetByName(string name);
		ICollection<RestaurantTypeDTO> GetTypes();
		RestaurantDetailResponseDTO RetrieveMyRestaurants(MyRestaurantsFilterParams filterParams, Guid ownerId);
		RestaurantListResponseDTO Retrieve(RestaurantFilterParams filterParams);
		ICollection<RestaurantListDTO> GetTop(int count);
		void Update(RestaurantDetailDTO restaurantDTO);
		void AddAddress(RestaurantAddressDTO restaurantAddressDTO);
		void RemoveAddress(Guid restaurantAddressId);
		void RemoveRestaurant(Guid restaurantId);
		ICollection<string> GetAllNames();
		void Activate(Guid restaurantId);
		void Deactivate(Guid restaurantId);
	}
}
