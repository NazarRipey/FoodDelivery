using System;
using System.Collections.Generic;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.BusinessLogic.Facades
{
	public interface IDishFacade
	{
		ICollection<DishCategoryDTO> GetCategories();
		DishListDTO GetByNameWithinRestaurant(string name, Guid restaurantId);
		void Create(DishAddDTO dishDTO);
		void Update(DishUpdateDTO dishUpdateDTO);
		void Remove(Guid id);
		DishListResponseDTO Retrieve(DishFilterParams filterParams);
		ICollection<DishListDTO> GetTop(int count);
		DishCartDTO GetCartDTOById(Guid id);
		void Deactivate(Guid id);
		void Activate(Guid id);
		DishDetailDTO GetDetailDTOById(Guid id);
		DishUpdateDTO GetUpdateDTOById(Guid id);
	}
}
