using System;
using System.Collections.Generic;
using System.Linq;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.BusinessLogic.Facades
{
	public class RestaurantOrderFacade : IRestaurantOrderFacade
	{
		private readonly IRestaurantOrderRepository _restaurantOrderRepository;
		private readonly IRestaurantRepository _restaurantRepository;
		private readonly IRestaurantOrderItemRepository _restaurantOrderItemRepository;
		private readonly IOrderRepository _orderRepository;
		private readonly IOrderItemRepository _orderItemRepository;

		public RestaurantOrderFacade(IRestaurantOrderRepository restaurantOrderRepository,
			IRestaurantRepository restaurantRepository,
			IRestaurantOrderItemRepository restaurantOrderItemRepository,
			IOrderRepository orderRepository,
			IOrderItemRepository orderItemRepository)
		{
			_restaurantOrderRepository = restaurantOrderRepository;
			_restaurantRepository = restaurantRepository;
			_restaurantOrderItemRepository = restaurantOrderItemRepository;
			_orderRepository = orderRepository;
			_orderItemRepository = orderItemRepository;
		}
		public RestaurantOrderShortResponseDTO RetrieveAwaitingOrders(string name, BaseFilterParams filterParams)
		{
			return _restaurantRepository.RetrieveOrdersByStatus(name, filterParams, new List<int>() {
				(int)OrderStatus.PendingCooking,
				(int)OrderStatus.ChangeQuantityReplied,
				(int)OrderStatus.ChangeQuantityRequested
			});
		}
		public RestaurantOrderShortResponseDTO RetrieveCookingOrders(string name, BaseFilterParams filterParams)
		{
			return _restaurantRepository.RetrieveOrdersByStatus(name, filterParams, new List<int>() {
				(int)OrderStatus.Cooking
			});
		}
		public RestaurantOrderShortResponseDTO RetrieveOrderHistory(string name, BaseFilterParams filterParams)
		{
			return _restaurantRepository.RetrieveOrdersByStatus(name, filterParams, new List<int>() {
				(int)OrderStatus.PendingCooking,
				(int)OrderStatus.ChangeQuantityReplied,
				(int)OrderStatus.ChangeQuantityRequested,
				(int)OrderStatus.Cooking,
				(int)OrderStatus.Ready,
			});
		}

		public ICollection<RestaurantOrderItemDTO> GetRestaurantOrderItems(Guid id)
		{
			return _restaurantOrderRepository.GetRestaurantOrderItems(id);
		}

		public void AddRequestQuantity(ICollection<RestaurantOrderItemDTO> orderItemDTOs)
		{
			RestaurantOrderItem restaurantOrderItem =
				_restaurantOrderItemRepository.GetRestaurantOrderItemById(orderItemDTOs.First().Id);

			_restaurantOrderItemRepository.AddRequestQuantity(orderItemDTOs);

			_restaurantOrderRepository.ChangeStatusToLeastReady(restaurantOrderItem.RestaurantOrderId);
			_orderRepository.ChangeStatusToLeastReady(restaurantOrderItem.OrderItem.OrderId);
		}

		public void ApproveQuantityRequest(RestaurantOrderItemDTO restaurantOrderItemDTO)
		{
			RestaurantOrderItem restaurantOrderItem =
				_restaurantOrderItemRepository.GetRestaurantOrderItemById(restaurantOrderItemDTO.Id);

			_orderItemRepository.UpdateQuantity(restaurantOrderItem.OrderItemId, restaurantOrderItemDTO.RequestedQuantity);
			_restaurantOrderItemRepository
				.UpdateStatus(restaurantOrderItemDTO.Id, (int)OrderStatus.ChangeQuantityReplied);
			_orderItemRepository.RecalculatePrice(restaurantOrderItem.OrderItem.OrderId);

			_restaurantOrderRepository.ChangeStatusToLeastReady(restaurantOrderItem.RestaurantOrderId);
			_orderRepository.ChangeStatusToLeastReady(restaurantOrderItem.OrderItem.OrderId);
		}

		public void DeclineQuantityRequest(RestaurantOrderItemDTO restaurantOrderItemDTO)
		{
			RestaurantOrderItem restaurantOrderItem =
				_restaurantOrderItemRepository.GetRestaurantOrderItemById(restaurantOrderItemDTO.Id);
			Order order = restaurantOrderItem.OrderItem.Order;

			_restaurantOrderItemRepository.CancelItem(restaurantOrderItem.Id);

			if (_restaurantOrderRepository.GetRestaurantOrderItems(restaurantOrderItem.RestaurantOrderId).Count == 0)
			{
				_restaurantOrderRepository.Delete(restaurantOrderItem.RestaurantOrderId);

				if (order.OrderItems.Count == 0)
				{
					_orderRepository.Delete(order.Id);
				}
				else
				{
					_orderItemRepository.RecalculatePrice(order);

					_orderRepository.ChangeStatusToLeastReady(restaurantOrderItem.OrderItem.OrderId);
				}
			}
			else
			{
				_orderItemRepository.RecalculatePrice(order);

				_restaurantOrderRepository.ChangeStatusToLeastReady(restaurantOrderItem.RestaurantOrderId);
				_orderRepository.ChangeStatusToLeastReady(restaurantOrderItem.OrderItem.OrderId);
			}
		}

		public void StartCooking(Guid restaurantOrderId)
		{
			RestaurantOrder restaurantOrder = _restaurantOrderRepository.GetRestaurantOrderById(restaurantOrderId);

			_restaurantOrderItemRepository
				.UpdateItemsStatus(restaurantOrder.RestaurantOrderItems, (int)OrderStatus.Cooking);

			_restaurantOrderRepository.ChangeStatusToLeastReady(restaurantOrderId);
			_orderRepository.ChangeStatusToLeastReady(restaurantOrder.OrderId);
		}

		public void MakeReady(RestaurantOrderItemDTO restaurantOrderItemDTO)
		{
			RestaurantOrderItem restaurantOrderItem =
				_restaurantOrderItemRepository.GetRestaurantOrderItemById(restaurantOrderItemDTO.Id);

			_restaurantOrderItemRepository
				.UpdateStatus(restaurantOrderItemDTO.Id, (int)OrderStatus.Ready);

			_restaurantOrderRepository.ChangeStatusToLeastReady(restaurantOrderItem.RestaurantOrderId);
			_orderRepository.ChangeStatusToLeastReady(restaurantOrderItem.OrderItem.OrderId);
		}

		public void Delete(Guid id)
		{
			RestaurantOrder restaurantOrder = _restaurantOrderRepository.GetRestaurantOrderById(id);
			Order order = restaurantOrder.Order;
			List<OrderItem> orderItems = restaurantOrder.RestaurantOrderItems.Select(ro => ro.OrderItem).ToList();

			_restaurantOrderItemRepository.DeleteItems(restaurantOrder.RestaurantOrderItems);
			_orderItemRepository.DeleteItems(orderItems);
			_restaurantOrderRepository.Delete(id);

			if (order.OrderItems.Count == 0)
			{
				_orderRepository.Delete(order.Id);
			}
			else
			{
				_orderItemRepository.RecalculatePrice(order);
				_orderRepository.ChangeStatusToLeastReady(order.Id);
			}
		}
	}
}
