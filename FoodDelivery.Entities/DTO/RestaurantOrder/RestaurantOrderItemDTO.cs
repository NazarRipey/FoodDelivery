using System;
using FoodDelivery.Entities.DTO.Order;
using FoodDelivery.Entities.Enums.Status;

namespace FoodDelivery.Entities.DTO
{
	public class RestaurantOrderItemDTO
	{
		public Guid Id { get; set; }
		public OrderItemStatus Status { get; set; }
		public OrderItemDTO OrderItem { get; set; }
		public int? RequestedQuantity { get; set; }
	}
}
