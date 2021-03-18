using System;
using System.Collections.Generic;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Entities.DTO;

namespace FoodDelivery.BusinessLogic.Facades
{
	public class RestaurantFacade : IRestaurantFacade
	{
		private readonly IRestaurantRepository _restaurantRepository;

		public RestaurantFacade(IRestaurantRepository restaurantRepository)
		{
			_restaurantRepository = restaurantRepository;
		}
		public void Create(RestaurantDTO restaurantDTO)
		{
			_restaurantRepository.Create(restaurantDTO);
		}

		public Restaurant GetByName(string name)
		{
			return _restaurantRepository.GetByName(name);
		}

		public ICollection<RestaurantDTO> GetMyRestaurants(Guid ownerId)
		{
			return _restaurantRepository.GetMyRestaurants(ownerId);
		}

		public ICollection<RestaurantTypeDTO> GetTypes()
		{
			return _restaurantRepository.GetTypes();
		}
	}
}
