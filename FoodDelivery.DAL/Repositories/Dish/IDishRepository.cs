using System;
using System.Collections.Generic;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Dish;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.DAL.Repositories
{
	public interface IDishRepository
	{
		DishListDTO GetByNameWithinRestaurant(string name, Guid restaurantId);
		void Create(DishAddDTO dishDTO);
		void Update(DishUpdateDTO dishUpdateDTO);
		void UpdateStatus(Guid id, int status);
		void Remove(Guid id);
		DishListResponseDTO Retrieve(DishFilterParams filterParams);
		ICollection<DishListDTO> GetTop(int count);
		DishCartDTO GetCartDTOById(Guid id);
		DishDetailDTO GetDetailDTOById(Guid id);
		DishUpdateDTO GetUpdateDTOById(Guid id);
		DishRestaurantListResponseDTO RetrieveByRestaurant(DishRestaurantFilterParams filterParams);
	}
}
