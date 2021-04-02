using System;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.DAL.Repositories
{
	public interface IRestaurantRequestRepository
	{
		RestaurantRequestResponseDTO Retrieve(RestaurantRequestFilterParams filterParam);
		void Update(Guid id, int statusId);
		void Create(Guid userId, Guid restaurantId);
		RestaurantRequest GetById(Guid id);
	}
}
