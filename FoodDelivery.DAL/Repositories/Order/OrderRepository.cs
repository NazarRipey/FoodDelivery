using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO.Order;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.Repositories
{
	public class OrderRepository : BaseRepository, IOrderRepository
	{
		public OrderRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public void AddOrder(AddOrderDTO addOrderDTO)
		{
			Cart cart = _db.Cart.Find(addOrderDTO.CartId);
			Guid orderId = Guid.NewGuid();

			#region order
			Order order = new Order()
			{
				Id = orderId,

				UserProfileId = cart.UserProfileId,
				CreatedDate = DateTime.Now,
				Status = (int)OrderStatus.AwaitingManagerVerification,

				OrderNumber = addOrderDTO.OrderNumber,
				PaymentType = (int)addOrderDTO.PaymentType,
				Address = addOrderDTO.Address,
				Comment = addOrderDTO.Comment,
				ContactPhoneNumber = addOrderDTO.ContactPhoneNumber,

				TotalSum = cart.CartItems.Select(c => c.Dish.Price * c.Quantity).Sum()
			};

			_db.Order.Add(order);
			SaveChanges();
			#endregion

			#region orderItems

			foreach (CartItem cartItem in cart.CartItems)
			{
				OrderItem orderItem = new OrderItem()
				{
					OrderId = orderId,
					DishId = cartItem.DishId,
					Quantity = cartItem.Quantity
				};

				_db.OrderItem.Add(orderItem);
			}
			SaveChanges();
			#endregion
		}

		public ICollection<OrderShortDTO> GetActive(Guid userId)
		{
			IQueryable<Order> orders = _db.Order.Where(o => o.UserProfileId == userId
				&& (o.Status != (int)OrderStatus.Cancelled && o.Status != (int)OrderStatus.Delivered))
				.OrderByDescending(o => o.CreatedDate);

			ICollection<Order> ordersToReturn = orders.ToList();

			ICollection<OrderShortDTO> orderDTOs = _mapper.Map<ICollection<OrderShortDTO>>(ordersToReturn);

			return orderDTOs;
		}

		public OrderDetailDTO GetDetailDTOById(Guid id)
		{
			Order order = _db.Order.Find(id);
			OrderDetailDTO orderDetailDTO = _mapper.Map<OrderDetailDTO>(order);

			return orderDetailDTO;
		}

		public ICollection<OrderItemDTO> GetOrderItems(Guid id)
		{
			Order order = _db.Order.Find(id);

			ICollection<OrderItemDTO> orderItems = _mapper.Map<ICollection<OrderItemDTO>>(order.OrderItems);

			return orderItems;
		}

		public UpdateOrderDTO GetUpdateDTOById(Guid id)
		{
			Order order = _db.Order.Find(id);
			UpdateOrderDTO updateOrderDTO = _mapper.Map<UpdateOrderDTO>(order);

			return updateOrderDTO;
		}

		public void Release(Guid orderId)
		{
			Order order = _db.Order.Find(orderId);
			order.ManagerId = null;

			_db.Entry(order).State = EntityState.Modified;

			SaveChanges();
		}

		public AvailableOrderResponseDTO RetrieveAvailable(BaseFilterParams filterParams)
		{
			int totalOrdersCount = 0;

			IQueryable<Order> orders = _db.Order
				.Where(o => o.ManagerId == null && o.Status != (int)OrderStatus.Cancelled)
				.OrderBy(o => o.CreatedDate);

			if (filterParams.Search != null)
			{
				orders = orders
					.Where(o => (o.UserProfile.FirstName + " " + o.UserProfile.LastName)
					.Contains(filterParams.Search));
			}

			totalOrdersCount = orders.Count();

			ICollection<Order> ordersToReturn = orders
				.Skip(filterParams.ItemsPerPage * (filterParams.CurrentPage - 1))
				.Take(filterParams.ItemsPerPage)
				.ToList();

			ICollection<AvailableOrderDTO> orderDTOs = _mapper.Map<ICollection<AvailableOrderDTO>>(ordersToReturn);

			AvailableOrderResponseDTO availableOrderResponseDTO = new AvailableOrderResponseDTO()
			{
				TotalOrdersCount = totalOrdersCount,
				Orders = orderDTOs
			};

			return availableOrderResponseDTO;
		}

		public OrderResponseDTO RetrieveHistory(OrderFilterParams orderFilterParams, Guid userId)
		{
			int totalItemsCount = 0;
			IQueryable<Order> orders = _db.Order
				.Where(o => o.UserProfileId == userId)
				.OrderByDescending(o => o.CreatedDate);

			if (orderFilterParams.Search != null)
			{
				orders = orders.Where(o => o.OrderNumber.ToString().Contains(orderFilterParams.Search));
			}
			if (orderFilterParams.Status != null)
			{
				orders = orders.Where(r => r.Status == (int)orderFilterParams.Status);
			}

			totalItemsCount = orders.Count();

			ICollection<Order> ordersToReturn = orders
				.Skip(orderFilterParams.ItemsPerPage * (orderFilterParams.CurrentPage - 1))
				.Take(orderFilterParams.ItemsPerPage)
				.ToList();

			ICollection<OrderShortDTO> orderDTOs = _mapper.Map<ICollection<OrderShortDTO>>(ordersToReturn);

			OrderResponseDTO orderResponseDTO = new OrderResponseDTO()
			{
				Orders = orderDTOs,
				TotalOrdersCount = totalItemsCount
			};

			return orderResponseDTO;
		}

		public OrderManagerResponseDTO RetrieveHistoryByManager(BaseFilterParams filterParams, Guid managerId)
		{
			int totalItemsCount = 0;
			IQueryable<Order> orders = _db.Order
				.Where(o => o.ManagerId == managerId)
				.OrderByDescending(o => o.CreatedDate);

			if (filterParams.Search != null)
			{
				orders = orders.Where(o => o.OrderNumber.ToString().Contains(filterParams.Search)
						|| (o.UserProfile.FirstName + " " + o.UserProfile.LastName).Contains(filterParams.Search));
			}

			totalItemsCount = orders.Count();

			ICollection<Order> ordersToReturn = orders
				.Skip(filterParams.ItemsPerPage * (filterParams.CurrentPage - 1))
				.Take(filterParams.ItemsPerPage)
				.ToList();

			ICollection<OrderManagerDTO> orderDTOs = _mapper.Map<ICollection<OrderManagerDTO>>(ordersToReturn);

			OrderManagerResponseDTO orderResponseDTO = new OrderManagerResponseDTO()
			{
				Orders = orderDTOs,
				TotalOrdersCount = totalItemsCount
			};

			return orderResponseDTO;
		}

		public OrderManagerResponseDTO RetrieveTaken(BaseFilterParams filterParams, Guid managerId)
		{
			int totalOrdersCount = 0;

			IQueryable<Order> orders = _db.Order
				.Where(o => o.ManagerId == managerId
					&& (o.Status != (int)OrderStatus.Cancelled && o.Status != (int)OrderStatus.Delivered))
				.OrderBy(o => o.CreatedDate);

			if (filterParams.Search != null)
			{
				orders = orders
					.Where(o => (o.UserProfile.FirstName + " " + o.UserProfile.LastName)
					.Contains(filterParams.Search));
			}

			totalOrdersCount = orders.Count();

			ICollection<Order> ordersToReturn = orders
				.Skip(filterParams.ItemsPerPage * (filterParams.CurrentPage - 1))
				.Take(filterParams.ItemsPerPage)
				.ToList();

			ICollection<OrderManagerDTO> orderDTOs = _mapper.Map<ICollection<OrderManagerDTO>>(ordersToReturn);

			OrderManagerResponseDTO takenOrderResponseDTO = new OrderManagerResponseDTO()
			{
				TotalOrdersCount = totalOrdersCount,
				Orders = orderDTOs
			};

			return takenOrderResponseDTO;
		}

		public void Take(Guid orderId, Guid managerId)
		{
			Order order = _db.Order.Find(orderId);
			if (order.ManagerId == null)
			{
				order.ManagerId = managerId;
			}

			_db.Entry(order).State = EntityState.Modified;

			SaveChanges();
		}

		public void Update(UpdateOrderDTO updateOrderDTO)
		{
			Order order = _db.Order.Find(updateOrderDTO.Id);

			order.Comment = updateOrderDTO.Comment;
			order.Address = updateOrderDTO.Address;
			order.ContactPhoneNumber = updateOrderDTO.ContactPhoneNumber;

			_db.Entry(order).State = EntityState.Modified;

			SaveChanges();
		}

		public void UpdateStatus(Guid id, int status)
		{
			Order order = _db.Order.Find(id);

			order.Status = status;

			if (status == (int)OrderStatus.Cancelled || status == (int)OrderStatus.Delivered)
			{
				order.ClosedDate = DateTime.Now;
			}

			_db.Entry(order).State = EntityState.Modified;

			SaveChanges();
		}
	}
}
