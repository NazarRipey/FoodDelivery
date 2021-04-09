using System;
using System.Collections.Generic;
using FoodDelivery.Entities.DTO.Order;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.DAL.Repositories
{
	public interface IOrderRepository
	{
		void AddOrder(AddOrderDTO addOrderDTO);
		OrderResponseDTO RetrieveHistory(OrderFilterParams orderFilterParams, Guid userId);
		ICollection<OrderShortDTO> GetActive(Guid userId);
		void UpdateStatus(Guid id, int status);
		OrderDetailDTO GetDetailDTOById(Guid id);
		UpdateOrderDTO GetUpdateDTOById(Guid id);
		void Update(UpdateOrderDTO updateOrderDTO);
		AvailableOrderResponseDTO RetrieveAvailable(BaseFilterParams filterParams);
		void Take(Guid orderId, Guid managerId);
		OrderManagerResponseDTO RetrieveTaken(BaseFilterParams filterParams, Guid managerId);
		ICollection<OrderItemDTO> GetOrderItems(Guid id);
		void Release(Guid orderId);
		OrderManagerResponseDTO RetrieveHistoryByManager(BaseFilterParams filterParams, Guid managerId);
	}
}
