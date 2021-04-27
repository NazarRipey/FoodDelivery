using System;
using System.Collections.Generic;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Order;
using FoodDelivery.Entities.Enums.Status;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.Repositories
{
	public class RestaurantOrderItemRepository : BaseRepository, IRestaurantOrderItemRepository
	{
		public RestaurantOrderItemRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public void AddRequestQuantity(ICollection<RestaurantOrderItemDTO> orderItemDTOs)
		{
			foreach (RestaurantOrderItemDTO orderItem in orderItemDTOs)
			{
				RestaurantOrderItem restaurantOrderItem = _db.RestaurantOrderItem.Find(orderItem.Id);

				restaurantOrderItem.RequestedQuantity = orderItem.RequestedQuantity;
				restaurantOrderItem.Status = (int)OrderStatus.ChangeQuantityRequested;
				_db.Entry(restaurantOrderItem).State = EntityState.Modified;
			}

			SaveChanges();
		}

		public void CancelItem(Guid id)
		{
			RestaurantOrderItem restaurantOrderItem = _db.RestaurantOrderItem.Find(id);

			_db.RestaurantOrderItem.Remove(restaurantOrderItem);
			_db.OrderItem.Remove(restaurantOrderItem.OrderItem);

			SaveChanges();
		}

		public void CreateItems(Guid restaurantOrderId, IEnumerable<OrderItemDTO> restaurantOrderItems)
		{
			foreach (OrderItemDTO orderItem in restaurantOrderItems)
			{
				RestaurantOrderItem restaurantOrderItem = new RestaurantOrderItem()
				{
					RestaurantOrderId = restaurantOrderId,
					OrderItemId = orderItem.Id,
					Status = (int)OrderStatus.PendingCooking
				};

				_db.RestaurantOrderItem.Add(restaurantOrderItem);
			}

			SaveChanges();
		}

		public void DeleteItems(List<RestaurantOrderItem> restaurantOrderItems)
		{
			_db.RestaurantOrderItem.RemoveRange(restaurantOrderItems);
			SaveChanges();
		}

		public RestaurantOrderItem GetRestaurantOrderItemById(Guid id)
		{
			RestaurantOrderItem restaurantOrderItem = _db.RestaurantOrderItem.Find(id);

			return restaurantOrderItem;
		}

		public void UpdateItemsStatus(List<RestaurantOrderItem> restaurantOrderItems, int status)
		{
			foreach (RestaurantOrderItem item in restaurantOrderItems)
			{
				item.Status = status;

				_db.Entry(item).State = EntityState.Modified;
			}

			SaveChanges();
		}

		public void UpdateStatus(Guid id, int status)
		{
			RestaurantOrderItem restaurantOrderItem = _db.RestaurantOrderItem.Find(id);

			restaurantOrderItem.Status = status;
			if (status == (int)OrderStatus.ChangeQuantityReplied)
			{
				restaurantOrderItem.RequestedQuantity = null;
			}

			_db.Entry(restaurantOrderItem).State = EntityState.Modified;
			SaveChanges();
		}
	}
}
