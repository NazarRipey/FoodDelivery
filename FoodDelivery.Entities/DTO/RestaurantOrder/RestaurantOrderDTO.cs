using System;
using System.Collections.Generic;
using FoodDelivery.Entities.Enums.Status;

namespace FoodDelivery.Entities.DTO
{
	public class RestaurantOrderDTO
	{
		public Guid Id { get; set; }
		public Guid OrderId { get; set; }
		public OrderStatus Status { get; set; }
		public string RestaurantName { get; set; }
		public List<RestaurantOrderItemDTO> RestaurantOrderItems { get; set; }
		public decimal TotalSum { get; set; }
	}
}
