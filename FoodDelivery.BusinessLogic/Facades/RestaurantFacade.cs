using System;
using System.Collections.Generic;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Entities;
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
		private readonly IRestaurantRatingRepository _restaurantRatingRepository;

		public RestaurantFacade(IRestaurantRepository restaurantRepository,
			IRestaurantAddressRepository restaurantAddressRepository,
			IRestaurantTypeRepository restaurantTypeRepository,
			IRestaurantRatingRepository restaurantRatingRepository)
		{
			_restaurantRepository = restaurantRepository;
			_restaurantAddressRepository = restaurantAddressRepository;
			_restaurantTypeRepository = restaurantTypeRepository;
			_restaurantRatingRepository = restaurantRatingRepository;
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
			var restaurantResponse = _restaurantRepository.Retrieve(filterParams);

			foreach (RestaurantListDTO restaurant in restaurantResponse.Restaurants)
			{
				restaurant.Rating = GetRestaurantRating(restaurant.Id);
			}

			return restaurantResponse;
		}

		public ICollection<string> GetAllNames()
		{
			return _restaurantRepository.GetAllNames();
		}

		public RestaurantDetailDTO GetByName(string name, Guid? userId)
		{
			RestaurantDetailDTO restaurantDetailDTO = _restaurantRepository.GetByName(name);
			restaurantDetailDTO.Rating = GetRestaurantRating(restaurantDetailDTO.Id);
			restaurantDetailDTO.UserRating = _restaurantRatingRepository.GetUserRating(restaurantDetailDTO.Id, userId);

			return restaurantDetailDTO;
		}

		public ICollection<RestaurantListDTO> GetTop(int count)
		{
			var restaurants = _restaurantRepository.GetTop(count);

			foreach (RestaurantListDTO restaurant in restaurants)
			{
				restaurant.Rating = GetRestaurantRating(restaurant.Id);
			}

			return restaurants;
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

		public void DeactivateByEmail(string email)
		{
			_restaurantRepository.DeactivateByEmail(email);
		}

		public ICollection<RestaurantAddressDTO> GetAddresses(Guid id)
		{
			return _restaurantRepository.GetAddresses(id);
		}

		public Rating GetRestaurantRating(Guid id)
		{
			return _restaurantRatingRepository.GetRating(id);
		}

		public void RateRestaurant(RateRestaurantDTO rateRestaurantDTO)
		{
			_restaurantRatingRepository.Rate(rateRestaurantDTO);
		}
	}
}
