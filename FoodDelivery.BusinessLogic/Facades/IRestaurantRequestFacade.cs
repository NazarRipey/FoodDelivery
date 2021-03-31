using System;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.BusinessLogic.Facades
{
	public interface IRestaurantRequestFacade
	{
		void Create(Guid userId, Guid restaurantId);
		RestaurantRequestResponseDTO Retrieve(RestaurantRequestFilterParams filterParam);
		void Approve(Guid id);
		void Decline(Guid id);
	}
}
