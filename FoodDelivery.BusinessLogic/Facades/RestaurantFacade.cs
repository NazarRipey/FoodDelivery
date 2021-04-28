using System;
using System.Collections.Generic;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Restaurant;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;
using FoodDelivery.Utilities.Helpers;

namespace FoodDelivery.BusinessLogic.Facades
{
	public class RestaurantFacade : IRestaurantFacade
	{
		private readonly IRestaurantRepository _restaurantRepository;
		private readonly IRestaurantAddressRepository _restaurantAddressRepository;
		private readonly IRestaurantTypeRepository _restaurantTypeRepository;
		private readonly IRestaurantRatingRepository _restaurantRatingRepository;

		private readonly IRestaurantOrderRepository _restaurantOrderRepository;

		public RestaurantFacade(IRestaurantRepository restaurantRepository,
			IRestaurantAddressRepository restaurantAddressRepository,
			IRestaurantTypeRepository restaurantTypeRepository,
			IRestaurantRatingRepository restaurantRatingRepository,
			IRestaurantOrderRepository restaurantOrderRepository)
		{
			_restaurantRepository = restaurantRepository;
			_restaurantAddressRepository = restaurantAddressRepository;
			_restaurantTypeRepository = restaurantTypeRepository;
			_restaurantRatingRepository = restaurantRatingRepository;
			_restaurantOrderRepository = restaurantOrderRepository;
		}

		public void AddAddress(RestaurantAddressDTO restaurantAddressDTO)
		{
			_restaurantAddressRepository.Add(restaurantAddressDTO);
		}

		public void Create(RestaurantAddDTO restaurantAddDTO)
		{
			Guid? imageName = null;

			if (restaurantAddDTO.Image != null && !string.IsNullOrWhiteSpace(restaurantAddDTO.Image.Data))
			{
				imageName = Guid.NewGuid();
				FileHelper.SaveRestaurantImage(restaurantAddDTO.Image.Data, imageName.ToString());
			}

			_restaurantRepository.Create(restaurantAddDTO, imageName);
		}

		public RestaurantListResponseDTO Retrieve(RestaurantFilterParams filterParams)
		{
			var restaurantResponse = _restaurantRepository.Retrieve(filterParams);

			foreach (RestaurantListDTO restaurant in restaurantResponse.Restaurants)
			{
				restaurant.Rating = GetRestaurantRating(restaurant.Id);
				restaurant.Base64Image = FileHelper.GetRestaurantImage(restaurant.ImageName);
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
			restaurantDetailDTO.Base64Image = FileHelper.GetRestaurantImage(restaurantDetailDTO.ImageName);

			return restaurantDetailDTO;
		}

		public ICollection<RestaurantListDTO> GetTop(int count)
		{
			var restaurants = _restaurantRepository.GetTop(count);

			foreach (RestaurantListDTO restaurant in restaurants)
			{
				restaurant.Rating = GetRestaurantRating(restaurant.Id);
				restaurant.Base64Image = FileHelper.GetRestaurantImage(restaurant.ImageName);
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

		public string GetImage(Guid id)
		{
			string imgName = _restaurantRepository.GetImageName(id);

			return FileHelper.GetRestaurantImage(imgName);
		}

		public void ChangeImage(Guid id, FileData image)
		{
			string imgName = _restaurantRepository.GetImageName(id);

			FileHelper.SaveRestaurantImage(image.Data, imgName);
		}

		public void DeleteImage(Guid id)
		{
			string imgName = _restaurantRepository.GetImageName(id);

			FileHelper.DeleteRestaurantImage(imgName);
		}

		public int GetRestaurantStatus(string name)
		{
			return _restaurantRepository.GetStatus(name);
		}
	}
}
