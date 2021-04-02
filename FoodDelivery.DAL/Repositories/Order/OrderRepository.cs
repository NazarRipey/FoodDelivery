using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO.Order;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;

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
				&& (o.Status != (int)OrderStatus.Cancelled || o.Status != (int)OrderStatus.Delivered));

			ICollection<Order> ordersToReturn = orders.ToList();

			ICollection<OrderShortDTO> orderDTOs = _mapper.Map<ICollection<OrderShortDTO>>(ordersToReturn);

			return orderDTOs;
		}

		public OrderResponseDTO RetrieveAll(OrderFilterParams orderFilterParams, Guid userId)
		{
			int totalItemsCount = 0;
			IQueryable<Order> orders = _db.Order
				.Where(o => o.UserProfileId == userId)
				.OrderByDescending(o => o.CreatedDate);

			if (orderFilterParams.Search != null)
			{
				orders = orders.Where(o => o.OrderNumber.ToString().Contains(orderFilterParams.Search));
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
	}
}
