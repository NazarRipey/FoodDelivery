using System;
using System.Collections.Generic;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Entities.DTO.Order;
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

		public void AddOrder(AddOrderDTO addOrderDTO)
		{
			_orderRepository.AddOrder(addOrderDTO);
			_cartRepository.Remove(addOrderDTO.CartId);
		}

		public ICollection<OrderShortDTO> GetActive(Guid userId)
		{
			return _orderRepository.GetActive(userId);
		}

		public OrderResponseDTO RetrieveAll(OrderFilterParams orderFilterParams, Guid userId)
		{
			return _orderRepository.RetrieveAll(orderFilterParams, userId);
		}
	}
}
