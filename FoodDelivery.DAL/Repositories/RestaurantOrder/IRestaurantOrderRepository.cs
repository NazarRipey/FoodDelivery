using System;
using System.Collections.Generic;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Info;

namespace FoodDelivery.DAL.Repositories
{
	public interface IRestaurantOrderRepository
	{
		void Create(Guid restaurantOrderId, Guid orderId, Guid restaurantId);
		ICollection<RestaurantOrderItemDTO> GetRestaurantOrderItems(Guid id);
		void ChangeStatusToLeastReady(Guid restaurantOrderId);
		void Delete(Guid restaurantOrderId);
		RestaurantOrder GetRestaurantOrderById(Guid id);
		OwnerInfo GetOwnerInfo(Guid userId);
	}
}
