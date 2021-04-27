using System;
using System.Collections.Generic;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Order;

namespace FoodDelivery.DAL.Repositories
{
	public interface IRestaurantOrderItemRepository
	{
		void CreateItems(Guid restaurantOrderId, IEnumerable<OrderItemDTO> restaurantOrderItems);
		void AddRequestQuantity(ICollection<RestaurantOrderItemDTO> orderItemDTOs);
		RestaurantOrderItem GetRestaurantOrderItemById(Guid id);
		void UpdateStatus(Guid id, int changeQuantityReplied);
		void UpdateItemsStatus(List<RestaurantOrderItem> restaurantOrderItems, int status);
		void CancelItem(Guid id);
		void DeleteItems(List<RestaurantOrderItem> restaurantOrderItems);
	}
}
