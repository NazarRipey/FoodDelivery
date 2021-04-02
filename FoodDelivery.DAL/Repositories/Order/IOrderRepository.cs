using System;
using System.Collections.Generic;
using FoodDelivery.Entities.DTO.Order;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.DAL.Repositories
{
	public interface IOrderRepository
	{
		void AddOrder(AddOrderDTO addOrderDTO);
		OrderResponseDTO RetrieveAll(OrderFilterParams orderFilterParams, Guid userId);
		ICollection<OrderShortDTO> GetActive(Guid userId);
	}
}
