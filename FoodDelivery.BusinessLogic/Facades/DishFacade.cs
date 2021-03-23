using System;
using System.Collections.Generic;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Params;

namespace FoodDelivery.BusinessLogic.Facades
{
	public class DishFacade : IDishFacade
	{
		private readonly IDishRepository _dishRepository;

		public DishFacade(IDishRepository dishRepository)
		{
			_dishRepository = dishRepository;
		}

		public void Create(DishDTO dishDTO)
		{
			_dishRepository.Create(dishDTO);
		}

		public ICollection<DishDTO> GetAll(DishParams dishFilter = null)
		{
			return _dishRepository.GetAll(dishFilter);
		}

		public DishDTO GetByNameWithinRestaurant(string name, Guid restaurantId)
		{
			return _dishRepository.GetByNameWithinRestaurant(name, restaurantId);
		}

		public ICollection<DishCategoryDTO> GetCategories()
		{
			return _dishRepository.GetCategories();
		}

		public ICollection<DishDTO> GetTop(int count)
		{
			return _dishRepository.GetTop(count);
		}

		public void Remove(Guid id)
		{
			_dishRepository.Remove(id);
		}

		public void Update(DishDTO dishDTO)
		{
			_dishRepository.Update(dishDTO);
		}
	}
}
