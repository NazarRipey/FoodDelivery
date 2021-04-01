using System;

namespace FoodDelivery.Entities.DTO
{
	public class CartItemDTO
	{
		public Guid Id { get; set; }
		public int Quantity { get; set; }
		public DishCartDTO Dish { get; set; }
	}
}
