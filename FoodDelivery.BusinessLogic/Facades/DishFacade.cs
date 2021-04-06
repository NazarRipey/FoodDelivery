using System;
using System.Collections.Generic;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.BusinessLogic.Facades
{
	public class DishFacade : IDishFacade
	{
		private readonly IDishRepository _dishRepository;
		private readonly IDishCategoryRepository _dishCategoryRepository;

		public DishFacade(IDishRepository dishRepository, IDishCategoryRepository dishCategoryRepository)
		{
			_dishRepository = dishRepository;
			_dishCategoryRepository = dishCategoryRepository;
		}

		public void Create(DishAddDTO dishDTO)
		{
			_dishRepository.Create(dishDTO);
		}

		public DishListResponseDTO Retrieve(DishFilterParams filterParams)
		{
			return _dishRepository.Retrieve(filterParams);
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
			return _dishRepository.GetTop(count);
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
			return _dishRepository.GetCartDTOById(id);
		}

		public void Deactivate(Guid id)
		{
			_dishRepository.UpdateStatus(id, (int)DishStatus.Inactive);
		}

		public void Activate(Guid id)
		{
			_dishRepository.UpdateStatus(id, (int)DishStatus.Active);
		}

		public DishDetailDTO GetDetailDTOById(Guid id)
		{
			return _dishRepository.GetDetailDTOById(id);
		}

		public DishUpdateDTO GetUpdateDTOById(Guid id)
		{
			return _dishRepository.GetUpdateDTOById(id);
		}
	}
}
