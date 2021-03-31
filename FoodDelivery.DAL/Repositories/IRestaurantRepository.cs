using System;
using System.Collections.Generic;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.DAL.Repositories
{
	public interface IRestaurantRepository
	{
		void Create(RestaurantDetailDTO restaurantDTO);
		RestaurantDetailDTO GetByName(string name);
		RestaurantDetailResponseDTO RetrieveMyRestaurants(MyRestaurantsFilterParams filterParams, Guid ownerId);
		RestaurantListResponseDTO Retrieve(RestaurantFilterParams filterParams);
		ICollection<RestaurantListDTO> GetTop(int count);
		void Update(RestaurantDetailDTO restaurantDTO);
		void UpdateStatus(Guid id, int status);
		void Remove(Guid restaurantId);
		ICollection<string> GetAllNames();
	}
}
