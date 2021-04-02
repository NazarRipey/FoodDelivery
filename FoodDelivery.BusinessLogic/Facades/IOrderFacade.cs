using System;
using System.Collections.Generic;
using FoodDelivery.Entities.DTO.Order;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.BusinessLogic.Facades
{
	public interface IOrderFacade
	{
		void AddOrder(AddOrderDTO addOrderDTO);
		OrderResponseDTO RetrieveAll(OrderFilterParams orderFilterParams, Guid userId);
		ICollection<OrderShortDTO> GetActive(Guid userId);
	}
}
