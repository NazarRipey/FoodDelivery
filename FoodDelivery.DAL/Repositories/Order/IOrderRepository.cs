using System;
using System.Collections.Generic;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Order;
using FoodDelivery.Entities.FilterParams;
using FoodDelivery.Entities.Info;

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
		OrderManagerResponseDTO RetrieveTaken(OrderFilterParams filterParams, Guid managerId);
		ICollection<OrderItemDTO> GetOrderItems(Guid id);
		void Release(Guid orderId);
		OrderManagerResponseDTO RetrieveHistoryByManager(BaseFilterParams filterParams, Guid managerId);
		OrderManagerDTO GetOrderManagerDTOById(Guid id);
		ICollection<RestaurantOrderDTO> GetRestaurantOrders(Guid id);
		void ChangeStatusToLeastReady(Guid orderId);
		ManagerInfo GetManagerInfo(Guid userId);
		void Delete(Guid orderId);
		Order GetOrderByOrderItemId(Guid orderItemId);
		string GetCustomerEmailByOrderId(Guid id);
	}
}
