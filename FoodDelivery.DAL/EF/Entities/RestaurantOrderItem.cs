using System;

namespace FoodDelivery.DAL.EF.Entities
{
	public class RestaurantOrderItem
	{
		public Guid Id { get; set; }
		public Guid RestaurantOrderId { get; set; }
		public Guid OrderItemId { get; set; }
		public int Status { get; set; }
		public int? RequestedQuantity { get; set; }

		public virtual RestaurantOrder RestaurantOrder { get; set; }
		public virtual OrderItem OrderItem { get; set; }
	}
}
