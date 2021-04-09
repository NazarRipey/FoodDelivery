using System;
using FoodDelivery.Entities.DTO.Dish;

namespace FoodDelivery.Entities.DTO.Order
{
	public class OrderItemDTO
	{
		public Guid Id { get; set; }
		public int Quantity { get; set; }
		public DishOrderDTO Dish { get; set; }
	}
}
