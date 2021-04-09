using System;
using System.Collections.Generic;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Restaurant;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.BusinessLogic.Facades
{
	public class RestaurantFacade : IRestaurantFacade
	{
		private readonly IRestaurantRepository _restaurantRepository;
		private readonly IRestaurantAddressRepository _restaurantAddressRepository;
		private readonly IRestaurantTypeRepository _restaurantTypeRepository;

		public RestaurantFacade(IRestaurantRepository restaurantRepository,
			IRestaurantAddressRepository restaurantAddressRepository,
			IRestaurantTypeRepository restaurantTypeRepository)
		{
			_restaurantRepository = restaurantRepository;
			_restaurantAddressRepository = restaurantAddressRepository;
			_restaurantTypeRepository = restaurantTypeRepository;
		}

		public void AddAddress(RestaurantAddressDTO restaurantAddressDTO)
		{
			_restaurantAddressRepository.Add(restaurantAddressDTO);
		}

		public void Create(RestaurantAddDTO restaurantAddDTO)
		{
			_restaurantRepository.Create(restaurantAddDTO);
		}

		public RestaurantListResponseDTO Retrieve(RestaurantFilterParams filterParams)
		{
			return _restaurantRepository.Retrieve(filterParams);
		}

		public ICollection<string> GetAllNames()
		{
			return _restaurantRepository.GetAllNames();
		}

		public RestaurantDetailDTO GetByName(string name)
		{
			return _restaurantRepository.GetByName(name);
		}

		public RestaurantOwnerDetailResponseDTO RetrieveMyRestaurants(MyRestaurantsFilterParams filterParams, Guid ownerId)
		{
			return _restaurantRepository.RetrieveMyRestaurants(filterParams, ownerId);
		}

		public ICollection<RestaurantListDTO> GetTop(int count)
		{
			return _restaurantRepository.GetTop(count);
		}

		public ICollection<RestaurantTypeDTO> GetTypes()
		{
			return _restaurantTypeRepository.GetTypes();
		}

		public void RemoveAddress(Guid restaurantAddressId)
		{
			_restaurantAddressRepository.Remove(restaurantAddressId);
		}

		public void RemoveRestaurant(Guid restaurantId)
		{
			_restaurantRepository.Remove(restaurantId);
		}

		public void Update(RestaurantUpdateDTO restaurantUpdateDTO)
		{
			_restaurantRepository.Update(restaurantUpdateDTO);
		}

		public void Activate(Guid restaurantId)
		{
			_restaurantRepository.UpdateStatus(restaurantId, (int)RestaurantStatus.Active);
		}

		public void Deactivate(Guid restaurantId)
		{
			_restaurantRepository.UpdateStatus(restaurantId, (int)RestaurantStatus.Inactive);
		}

		public RestaurantUpdateDTO GetUpdateDTOById(Guid id)
		{
			return _restaurantRepository.GetUpdateDTOById(id);
		}

		public ICollection<string> GetNamesByOwner(Guid ownerId)
		{
			return _restaurantRepository.GetNamesByOwner(ownerId);
		}
	}
}
