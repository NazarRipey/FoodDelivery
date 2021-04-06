using System;
using System.Collections.Generic;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Restaurant;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.DAL.Repositories
{
	public interface IRestaurantRepository
	{
		void Create(RestaurantAddDTO restaurantAddDTO);
		RestaurantDetailDTO GetByName(string name);
		RestaurantOwnerDetailResponseDTO RetrieveMyRestaurants(MyRestaurantsFilterParams filterParams, Guid ownerId);
		RestaurantListResponseDTO Retrieve(RestaurantFilterParams filterParams);
		ICollection<RestaurantListDTO> GetTop(int count);
		void Update(RestaurantUpdateDTO restaurantUpdateDTO);
		void UpdateStatus(Guid id, int status);
		void Remove(Guid restaurantId);
		ICollection<string> GetAllNames();
		RestaurantUpdateDTO GetUpdateDTOById(Guid id);
	}
}
