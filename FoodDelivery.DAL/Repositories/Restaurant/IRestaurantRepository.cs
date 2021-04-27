using System;
using System.Collections.Generic;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Restaurant;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.DAL.Repositories
{
	public interface IRestaurantRepository
	{
		void Create(RestaurantAddDTO restaurantAddDTO, Guid? imageName);
		RestaurantDetailDTO GetByName(string name);
		RestaurantListResponseDTO Retrieve(RestaurantFilterParams filterParams);
		ICollection<RestaurantListDTO> GetTop(int count);
		void Update(RestaurantUpdateDTO restaurantUpdateDTO);
		void UpdateStatus(Guid id, int status);
		void Remove(Guid restaurantId);
		ICollection<string> GetAllNames();
		RestaurantUpdateDTO GetUpdateDTOById(Guid id);
		ICollection<string> GetNamesByOwner(Guid id);
		void DeactivateByEmail(string email);
		ICollection<RestaurantAddressDTO> GetAddresses(Guid id);
		string GetImageName(Guid id);
		RestaurantOrderShortResponseDTO RetrieveOrdersByStatus(string name, BaseFilterParams filterParams, List<int> statuses);
		int GetStatus(string name);
	}
}
