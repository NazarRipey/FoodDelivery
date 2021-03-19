using System;
using System.Collections.Generic;
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

		public void AddAddress(RestaurantAddressDTO restaurantAddressDTO)
		{
			_restaurantRepository.AddAddress(restaurantAddressDTO);
		}

		public void Create(RestaurantDTO restaurantDTO)
		{
			_restaurantRepository.Create(restaurantDTO);
		}

		public ICollection<RestaurantDTO> GetAll()
		{
			return _restaurantRepository.GetAll();
		}

		public RestaurantDTO GetByName(string name)
		{
			return _restaurantRepository.GetByName(name);
		}

		public ICollection<RestaurantDTO> GetMyRestaurants(Guid ownerId)
		{
			return _restaurantRepository.GetMyRestaurants(ownerId);
		}

		public ICollection<RestaurantDTO> GetTop(int count)
		{
			return _restaurantRepository.GetTop(count);
		}

		public ICollection<RestaurantTypeDTO> GetTypes()
		{
			return _restaurantRepository.GetTypes();
		}

		public void RemoveAddress(Guid restaurantAddressId)
		{
			_restaurantRepository.RemoveAddress(restaurantAddressId);
		}

		public void RemoveRestaurant(Guid restaurantId)
		{
			_restaurantRepository.RemoveRestaurant(restaurantId);
		}

		public void Update(RestaurantDTO restaurantDTO)
		{
			_restaurantRepository.Update(restaurantDTO);
		}
	}
}
