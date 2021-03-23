using System;
using System.Collections.Generic;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Params;

namespace FoodDelivery.BusinessLogic.Facades
{
	public interface IDishFacade
	{
		ICollection<DishCategoryDTO> GetCategories();
		DishDTO GetByNameWithinRestaurant(string name, Guid restaurantId);
		void Create(DishDTO dishDTO);
		void Update(DishDTO dishDTO);
		void Remove(Guid id);
		ICollection<DishDTO> GetAll(DishParams dishFilter = null);
		ICollection<DishDTO> GetTop(int count);
	}
}
