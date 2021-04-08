using System;
using System.Collections.Generic;
using FoodDelivery.Entities.DTO.Order;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.BusinessLogic.Facades
{
	public interface IOrderFacade
	{
		void AddOrder(AddOrderDTO addOrderDTO, Guid userId);
		OrderResponseDTO RetrieveHistory(OrderFilterParams orderFilterParams, Guid userId);
		ICollection<OrderShortDTO> GetActive(Guid userId);
		void Cancel(Guid id);
		OrderDetailDTO GetOrderDetailDTOById(Guid id);
		UpdateOrderDTO GetUpdateDTOById(Guid id);
		void Update(UpdateOrderDTO updateOrderDTO);
		AvailableOrderResponseDTO RetrieveAvailable(BaseFilterParams filterParams);
		void TakeOrder(Guid orderId, Guid managerId);
	}
}
