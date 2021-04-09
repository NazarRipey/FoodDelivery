using System;
using System.Collections.Generic;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Entities.DTO.Order;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.BusinessLogic.Facades
{
	public class OrderFacade : IOrderFacade
	{
		private readonly IOrderRepository _orderRepository;
		private readonly IOrderItemRepository _orderItemRepository;
		private readonly ICartRepository _cartRepository;

		public OrderFacade(IOrderRepository orderRepository,
			IOrderItemRepository orderItemRepository,
			ICartRepository cartRepository)
		{
			_orderRepository = orderRepository;
			_orderItemRepository = orderItemRepository;
			_cartRepository = cartRepository;
		}

		public void AddOrder(AddOrderDTO addOrderDTO, Guid userId)
		{
			_orderRepository.AddOrder(addOrderDTO);
			_cartRepository.Remove(userId);
		}

		public void Cancel(Guid id)
		{
			_orderRepository.UpdateStatus(id, (int)OrderStatus.Cancelled);
		}

		public ICollection<OrderShortDTO> GetActive(Guid userId)
		{
			return _orderRepository.GetActive(userId);
		}

		public OrderDetailDTO GetOrderDetailDTOById(Guid id)
		{
			return _orderRepository.GetDetailDTOById(id);
		}

		public ICollection<OrderItemDTO> GetOrderItems(Guid id)
		{
			return _orderRepository.GetOrderItems(id);
		}

		public UpdateOrderDTO GetUpdateDTOById(Guid id)
		{
			return _orderRepository.GetUpdateDTOById(id);
		}

		public void ReleaseOrder(Guid orderId)
		{
			_orderRepository.Release(orderId);
		}

		public void RemoveItem(Guid id)
		{
			_orderItemRepository.Remove(id);
		}

		public AvailableOrderResponseDTO RetrieveAvailable(BaseFilterParams filterParams)
		{
			return _orderRepository.RetrieveAvailable(filterParams);
		}

		public OrderResponseDTO RetrieveHistory(OrderFilterParams orderFilterParams, Guid userId)
		{
			return _orderRepository.RetrieveHistory(orderFilterParams, userId);
		}

		public OrderManagerResponseDTO RetrieveHistoryByManager(BaseFilterParams filterParams, Guid managerId)
		{
			return _orderRepository.RetrieveHistoryByManager(filterParams, managerId);
		}

		public OrderManagerResponseDTO RetrieveTaken(BaseFilterParams filterParams, Guid managerId)
		{
			return _orderRepository.RetrieveTaken(filterParams, managerId);
		}

		public void TakeOrder(Guid orderId, Guid managerId)
		{
			_orderRepository.Take(orderId, managerId);
		}

		public void Update(UpdateOrderDTO updateOrderDTO)
		{
			_orderRepository.Update(updateOrderDTO);
		}

		public void UpdateOrderItem(Guid id, int quantity)
		{
			_orderItemRepository.Update(id, quantity);
		}
	}
}
