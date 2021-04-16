using System;
using System.Collections.Generic;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Dish;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.BusinessLogic.Facades
{
	public class DishFacade : IDishFacade
	{
		private readonly IDishRepository _dishRepository;
		private readonly IDishCategoryRepository _dishCategoryRepository;
		private readonly IDishRatingRepository _dishRatingRepository;

		public DishFacade(IDishRepository dishRepository,
			IDishCategoryRepository dishCategoryRepository,
			IDishRatingRepository dishRatingRepository)
		{
			_dishRepository = dishRepository;
			_dishCategoryRepository = dishCategoryRepository;
			_dishRatingRepository = dishRatingRepository;
		}

		public void Create(DishAddDTO dishDTO)
		{
			_dishRepository.Create(dishDTO);
		}

		public DishListResponseDTO Retrieve(DishFilterParams filterParams)
		{
			var dishResponse = _dishRepository.Retrieve(filterParams);

			foreach (DishListDTO dish in dishResponse.Dishes)
			{
				dish.Rating = GetDishRating(dish.Id);
			}

			return dishResponse;
		}

		public DishListDTO GetByNameWithinRestaurant(string name, Guid restaurantId)
		{
			return _dishRepository.GetByNameWithinRestaurant(name, restaurantId);
		}

		public ICollection<DishCategoryDTO> GetCategories()
		{
			return _dishCategoryRepository.GetCategories();
		}

		public ICollection<DishListDTO> GetTop(int count)
		{
			var dishes = _dishRepository.GetTop(count);

			foreach (DishListDTO dish in dishes)
			{
				dish.Rating = GetDishRating(dish.Id);
			}

			return dishes;
		}

		public void Remove(Guid id)
		{
			_dishRepository.Remove(id);
		}

		public void Update(DishUpdateDTO dishUpdateDTO)
		{
			_dishRepository.Update(dishUpdateDTO);
		}

		public DishCartDTO GetCartDTOById(Guid id)
		{
			DishCartDTO dishCartDTO = _dishRepository.GetCartDTOById(id);
			dishCartDTO.Rating = GetDishRating(id);

			return dishCartDTO;
		}

		public void Deactivate(Guid id)
		{
			_dishRepository.UpdateStatus(id, (int)DishStatus.Inactive);
		}

		public void Activate(Guid id)
		{
			_dishRepository.UpdateStatus(id, (int)DishStatus.Active);
		}

		public DishDetailDTO GetDetailDTOById(Guid id, Guid? userId)
		{
			DishDetailDTO dishDetailDTO = _dishRepository.GetDetailDTOById(id);

			dishDetailDTO.Rating = GetDishRating(id);
			dishDetailDTO.UserRating = _dishRatingRepository.GetUserRating(id, userId);

			return dishDetailDTO;
		}

		public DishUpdateDTO GetUpdateDTOById(Guid id)
		{
			return _dishRepository.GetUpdateDTOById(id);
		}

		public DishRestaurantListResponseDTO RetrieveByRestaurant(DishRestaurantFilterParams filterParams)
		{
			var dishResponse = _dishRepository.RetrieveByRestaurant(filterParams);

			foreach (DishListDTO dish in dishResponse.Dishes)
			{
				dish.Rating = GetDishRating(dish.Id);
			}

			return dishResponse;
		}

		public DishDetailResponseDTO RetrieveDishDetailDTOByRestaurant(DishRestaurantFilterParams filterParams)
		{
			var dishResponse = _dishRepository.RetrieveDishDetailDTOByRestaurant(filterParams);

			foreach (DishDetailDTO dish in dishResponse.Dishes)
			{
				dish.Rating = GetDishRating(dish.Id);
			}

			return dishResponse;
		}

		public Rating GetDishRating(Guid id)
		{
			return _dishRatingRepository.GetRating(id);
		}

		public void RateDish(RateDishDTO rateDishDTO)
		{
			_dishRatingRepository.Rate(rateDishDTO);
		}
	}
}
