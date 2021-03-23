using System;
using System.Collections.Generic;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Params;

namespace FoodDelivery.DAL.Repositories
{
	public interface IDishRepository
	{
		ICollection<DishCategoryDTO> GetCategories();
		DishDTO GetByNameWithinRestaurant(string name, Guid restaurantId);
		void Create(DishDTO dishDTO);
		void Update(DishDTO dishDTO);
		void Remove(Guid id);
		ICollection<DishDTO> GetAll(DishParams dishFilter);
		ICollection<DishDTO> GetTop(int count);
	}
}
