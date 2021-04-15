using System;
using FoodDelivery.Entities.DTO.Order;

namespace FoodDelivery.DAL.Repositories
{
	public interface IOrderItemRepository
	{
		void Update(Guid id, int quantity);
		void Remove(Guid id);
		OrderItemDTO Get(Guid id);
	}
}
