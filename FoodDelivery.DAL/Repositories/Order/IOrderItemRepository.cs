using System;
using System.Collections.Generic;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO.Order;

namespace FoodDelivery.DAL.Repositories
{
	public interface IOrderItemRepository
	{
		void Update(Guid id, int quantity);
		void Remove(Guid id);
		OrderItemDTO Get(Guid id);
		void UpdateQuantity(Guid orderItemId, int? requestedQuantity);
		void RecalculatePrice(Guid id);
		void RecalculatePrice(Order order);
		void DeleteItems(List<OrderItem> orderItems);
	}
}
