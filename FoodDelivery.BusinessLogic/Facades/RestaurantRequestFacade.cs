using System;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;
using FoodDelivery.Utilities.Managers;

namespace FoodDelivery.BusinessLogic.Facades
{
	public class RestaurantRequestFacade : IRestaurantRequestFacade
	{
		private readonly IRestaurantRequestRepository _restaurantRequestRepository;
		private readonly IRestaurantRepository _restaurantRepository;
		private readonly IEmailManager _emailManager;

		public RestaurantRequestFacade(
			IRestaurantRequestRepository restaurantRequestRepository,
			IRestaurantRepository restaurantRepository,
			IEmailManager emailManager)
		{
			_restaurantRequestRepository = restaurantRequestRepository;
			_restaurantRepository = restaurantRepository;
			_emailManager = emailManager;
		}

		public void Create(Guid userId, Guid restaurantId)
		{
			_restaurantRequestRepository.Create(userId, restaurantId);
		}

		public void Approve(Guid id)
		{
			RestaurantRequest restaurantRequest = _restaurantRequestRepository.GetById(id);

			if (restaurantRequest == null)
			{
				throw new Exception("no such request");
			}

			_restaurantRequestRepository.Update(id, (int)RestaurantRequestStatus.Approved);
			_restaurantRepository.UpdateStatus(restaurantRequest.RestaurantId, (int)RestaurantStatus.Active);

			_emailManager.SendRestaurantRequestStatusChangedAsync(
				restaurantRequest.UserProfile.Email,
				restaurantRequest.Restaurant.Name,
				RestaurantRequestStatus.Approved);
		}

		public void Decline(Guid id)
		{
			RestaurantRequest restaurantRequest = _restaurantRequestRepository.GetById(id);

			if (restaurantRequest == null)
			{
				throw new Exception("no such request");
			}

			_restaurantRequestRepository.Update(id, (int)RestaurantRequestStatus.Declined);
			_restaurantRepository.UpdateStatus(restaurantRequest.RestaurantId, (int)RestaurantStatus.Declined);

			_emailManager.SendRestaurantRequestStatusChangedAsync(
				restaurantRequest.UserProfile.Email,
				restaurantRequest.Restaurant.Name,
				RestaurantRequestStatus.Declined);
		}

		public RestaurantRequestResponseDTO Retrieve(RestaurantRequestFilterParams filterParam)
		{
			return _restaurantRequestRepository.Retrieve(filterParam);
		}
	}
}
