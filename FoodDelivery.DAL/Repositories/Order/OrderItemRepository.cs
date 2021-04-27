using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO.Order;
using FoodDelivery.Entities.Enums.Status;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.Repositories
{
	public class OrderItemRepository : BaseRepository, IOrderItemRepository
	{
		public OrderItemRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public OrderItemDTO Get(Guid id)
		{
			OrderItem orderItem = _db.OrderItem.Find(id);
			OrderItemDTO orderItemDTO = _mapper.Map<OrderItemDTO>(orderItem);

			return orderItemDTO;
		}

		public void Remove(Guid id)
		{
			OrderItem orderItem = _db.OrderItem.Find(id);

			if (orderItem.Order.OrderItems.Count == 1)
			{
				orderItem.Order.Status = (int)OrderStatus.Cancelled;
				_db.Entry(orderItem.Order).State = EntityState.Modified;
			}
			_db.Remove(orderItem);

			SaveChanges();

			RecalculatePrice(orderItem.Order);
		}

		public void Update(Guid id, int quantity)
		{
			OrderItem orderItem = _db.OrderItem.Find(id);
			orderItem.Quantity = quantity;

			_db.Entry(orderItem).State = EntityState.Modified;

			SaveChanges();

			RecalculatePrice(orderItem.Order);
		}

		public void UpdateQuantity(Guid orderItemId, int? requestedQuantity)
		{
			OrderItem orderItem = _db.OrderItem.Find(orderItemId);

			orderItem.Quantity = (int)requestedQuantity;
			_db.Entry(orderItem).State = EntityState.Modified;

			SaveChanges();
		}

		public void RecalculatePrice(Order order)
		{
			order.TotalSum = order.OrderItems.Select(oi => oi.Price * oi.Quantity).Sum();
			_db.Entry(order).State = EntityState.Modified;

			SaveChanges();
		}

		public void RecalculatePrice(Guid id)
		{
			Order order = _db.Order.Find(id);
			RecalculatePrice(order);
		}

		public void DeleteItems(List<OrderItem> orderItems)
		{
			_db.OrderItem.RemoveRange(orderItems);
			SaveChanges();
		}
	}
}
