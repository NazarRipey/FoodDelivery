using System;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.Enums.Status;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.Repositories
{
	public class OrderItemRepository : BaseRepository, IOrderItemRepository
	{
		public OrderItemRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

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

		private void RecalculatePrice(Order order)
		{
			order.TotalSum = order.OrderItems.Select(c => c.Dish.Price * c.Quantity).Sum();
			_db.Entry(order).State = EntityState.Modified;

			SaveChanges();
		}
	}
}
