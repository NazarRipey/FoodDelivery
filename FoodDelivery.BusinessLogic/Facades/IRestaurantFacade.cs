using System;
using System.Collections.Generic;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Restaurant;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.BusinessLogic.Facades
{
	public interface IRestaurantFacade
	{
		void Create(RestaurantAddDTO restaurantAddDTO);
		RestaurantDetailDTO GetByName(string name);
		ICollection<RestaurantTypeDTO> GetTypes();
		RestaurantOwnerDetailResponseDTO RetrieveMyRestaurants(MyRestaurantsFilterParams filterParams, Guid ownerId);
		RestaurantListResponseDTO Retrieve(RestaurantFilterParams filterParams);
		ICollection<RestaurantListDTO> GetTop(int count);
		void Update(RestaurantUpdateDTO restaurantUpdateDTO);
		void AddAddress(RestaurantAddressDTO restaurantAddressDTO);
		void RemoveAddress(Guid restaurantAddressId);
		void RemoveRestaurant(Guid restaurantId);
		ICollection<string> GetAllNames();
		void Activate(Guid restaurantId);
		void Deactivate(Guid restaurantId);
		RestaurantUpdateDTO GetUpdateDTOById(Guid id);
		ICollection<string> GetNamesByOwner(Guid ownerId);
		void DeactivateByEmail(string email);
	}
}
