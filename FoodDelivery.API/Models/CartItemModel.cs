using System;

namespace FoodDelivery.API.Models
{
	public class CartItemModel
	{
		public Guid DishId { get; set; }
		public int Quantity { get; set; }
	}
}
