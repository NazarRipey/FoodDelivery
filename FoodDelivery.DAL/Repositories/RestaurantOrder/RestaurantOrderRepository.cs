using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.Info;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.Repositories
{
	public class RestaurantOrderRepository : BaseRepository, IRestaurantOrderRepository
	{
		public RestaurantOrderRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public OwnerInfo GetOwnerInfo(Guid userId)
		{
			IQueryable<RestaurantOrder> restaurantOrders = _db.RestaurantOrder
				.Where(o => o.Restaurant.OwnerId == userId);

			OwnerInfo ownerInfo = new OwnerInfo()
			{
				TotalReplied = restaurantOrders
					.Where(o => o.Status == (int)OrderStatus.ChangeQuantityReplied)
					.Count(),
				TotalPendingCooking = restaurantOrders
					.Where(o => o.Status == (int)OrderStatus.PendingCooking)
					.Count()
			};

			return ownerInfo;
		}

		public void ChangeStatusToLeastReady(Guid restaurantOrderId)
		{
			RestaurantOrder restaurantOrder = _db.RestaurantOrder.Find(restaurantOrderId);

			restaurantOrder.Status = restaurantOrder.RestaurantOrderItems.Min(i => i.Status);

			_db.Entry(restaurantOrder).State = EntityState.Modified;

			SaveChanges();
		}

		public void Create(Guid restaurantOrderId, Guid orderId, Guid restaurantId)
		{
			RestaurantOrder restaurantOrder = new RestaurantOrder()
			{
				Id = restaurantOrderId,
				OrderId = orderId,
				RestaurantId = restaurantId,
				Status = (int)OrderStatus.PendingCooking
			};

			_db.RestaurantOrder.Add(restaurantOrder);

			SaveChanges();
		}

		public void Delete(Guid restaurantOrderId)
		{
			RestaurantOrder restaurantOrder = _db.RestaurantOrder.Find(restaurantOrderId);

			_db.Remove(restaurantOrder);
			SaveChanges();
		}

		public RestaurantOrder GetRestaurantOrderById(Guid id)
		{
			RestaurantOrder restaurantOrder = _db.RestaurantOrder.Find(id);

			return restaurantOrder;
		}

		public ICollection<RestaurantOrderItemDTO> GetRestaurantOrderItems(Guid id)
		{
			RestaurantOrder restaurantOrder = _db.RestaurantOrder.Find(id);

			if (restaurantOrder == null)
			{
				return null;
			}

			ICollection<RestaurantOrderItemDTO> restaurantOrderItemDTOs =
				_mapper.Map<ICollection<RestaurantOrderItemDTO>>(restaurantOrder.RestaurantOrderItems);

			return restaurantOrderItemDTOs;
		}
	}
}
