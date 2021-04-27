using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Order;
using FoodDelivery.Entities.FilterParams;
using FoodDelivery.Entities.Info;

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
		OrderManagerResponseDTO RetrieveTaken(OrderFilterParams filterParams, Guid managerId);
		ICollection<OrderItemDTO> GetOrderItems(Guid id);
		void ReleaseOrder(Guid orderId);
		OrderManagerResponseDTO RetrieveHistoryByManager(BaseFilterParams filterParams, Guid managerId);
		void UpdateOrderItem(Guid id, int quantity);
		void RemoveItem(Guid id);
		OrderManagerDTO GetOrderManagerDTOById(Guid id);
		OrderItemDTO GetOrderItem(Guid id);
		void VerifyOrder(Guid orderId);
		ICollection<RestaurantOrderDTO> GetRestaurantOrders(Guid id);
		ManagerInfo GetManagerInfo(Guid userId);
		void StartDelivery(Guid id);
		Task DeliveryCompletedAsync(OrderManagerDTO orderManagerDTO);
		OwnerInfo GetOwnerInfo(Guid userId);
	}
}
