using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Order;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;
using FoodDelivery.Entities.Info;
using FoodDelivery.Utilities.Managers;

namespace FoodDelivery.BusinessLogic.Facades
{
	public class OrderFacade : IOrderFacade
	{
		private readonly IOrderRepository _orderRepository;
		private readonly IOrderItemRepository _orderItemRepository;
		private readonly ICartRepository _cartRepository;
		private readonly IRestaurantOrderRepository _restaurantOrderRepository;
		private readonly IRestaurantOrderItemRepository _restaurantOrderItemRepository;
		private readonly IEmailManager _emailManager;

		public OrderFacade(IOrderRepository orderRepository,
			IOrderItemRepository orderItemRepository,
			ICartRepository cartRepository,
			IRestaurantOrderRepository restaurantOrderRepository,
			IRestaurantOrderItemRepository restaurantOrderItemRepository,
			IEmailManager emailManager)
		{
			_orderRepository = orderRepository;
			_orderItemRepository = orderItemRepository;
			_cartRepository = cartRepository;
			_restaurantOrderRepository = restaurantOrderRepository;
			_restaurantOrderItemRepository = restaurantOrderItemRepository;
			_emailManager = emailManager;
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

		public async Task DeliveryCompletedAsync(OrderManagerDTO orderManagerDTO)
		{
			string email = _orderRepository.GetCustomerEmailByOrderId(orderManagerDTO.Id);

			_orderRepository.UpdateStatus(orderManagerDTO.Id, (int)OrderStatus.Completed);
			await _emailManager.SendOrderCompletedAsync(email, orderManagerDTO.OrderNumber);
		}

		public ICollection<OrderShortDTO> GetActive(Guid userId)
		{
			return _orderRepository.GetActive(userId);
		}

		public ManagerInfo GetManagerInfo(Guid userId)
		{
			return _orderRepository.GetManagerInfo(userId);
		}

		public OrderDetailDTO GetOrderDetailDTOById(Guid id)
		{
			return _orderRepository.GetDetailDTOById(id);
		}

		public OrderItemDTO GetOrderItem(Guid id)
		{
			return _orderItemRepository.Get(id);
		}

		public ICollection<OrderItemDTO> GetOrderItems(Guid id)
		{
			return _orderRepository.GetOrderItems(id);
		}

		public OrderManagerDTO GetOrderManagerDTOById(Guid id)
		{
			return _orderRepository.GetOrderManagerDTOById(id);
		}

		public OwnerInfo GetOwnerInfo(Guid userId)
		{
			return _restaurantOrderRepository.GetOwnerInfo(userId);
		}

		public ICollection<RestaurantOrderDTO> GetRestaurantOrders(Guid id)
		{
			return _orderRepository.GetRestaurantOrders(id);
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

		public OrderManagerResponseDTO RetrieveTaken(OrderFilterParams filterParams, Guid managerId)
		{
			return _orderRepository.RetrieveTaken(filterParams, managerId);
		}

		public void StartDelivery(Guid id)
		{
			_orderRepository.UpdateStatus(id, (int)OrderStatus.Delivering);
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

		public void VerifyOrder(Guid orderId)
		{
			ICollection<OrderItemDTO> orderItems = _orderRepository.GetOrderItems(orderId);

			var orderItemsGroupedByRestaurant = orderItems.GroupBy(o => o.Dish.RestaurantId);

			foreach (var restaurantOrder in orderItemsGroupedByRestaurant)
			{
				Guid restaurantOrderId = Guid.NewGuid();

				_restaurantOrderRepository.Create(restaurantOrderId, orderId, restaurantOrder.Key);

				IEnumerable<OrderItemDTO> restaurantOrderItems = restaurantOrder.Select(items => items);

				_restaurantOrderItemRepository.CreateItems(restaurantOrderId, restaurantOrderItems);
			}

			_orderRepository.UpdateStatus(orderId, (int)OrderStatus.PendingCooking);
		}
	}
}
