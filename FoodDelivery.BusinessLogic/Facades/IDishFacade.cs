using System;
using System.Collections.Generic;
using FoodDelivery.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Dish;
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
		DishDetailDTO GetDetailDTOById(Guid id, Guid? userId);
		DishUpdateDTO GetUpdateDTOById(Guid id);
		DishRestaurantListResponseDTO RetrieveByRestaurant(DishRestaurantFilterParams filterParams);
		DishDetailResponseDTO RetrieveDishDetailDTOByRestaurant(DishRestaurantFilterParams filterParams);
		Rating GetDishRating(Guid id);
		void RateDish(RateDishDTO rateDishDTO);
		void ChangeImage(Guid id, FileData image);
		string GetImage(Guid id);
		void DeleteImage(Guid id);
		ICollection<int> GetRestrictedCategoriesIds();
	}
}
