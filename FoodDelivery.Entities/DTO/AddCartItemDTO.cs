using System;

namespace FoodDelivery.Entities.DTO
{
	public class AddCartItemDTO
	{
		public Guid UserProfileId { get; set; }
		public Guid DishId { get; set; }
		public int Quantity { get; set; }
	}
}
