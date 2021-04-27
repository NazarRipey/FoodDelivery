using System;
using FoodDelivery.Entities.Enums.Status;

namespace FoodDelivery.Entities.DTO
{
	public class RestaurantOrderShortDTO
	{
		public Guid Id { get; set; }
		public Guid OrderId { get; set; }
		public int OrderNumber { get; set; }
		public OrderStatus Status { get; set; }
		public DateTime CreatedDate { get; set; }
		public decimal TotalSum { get; set; }
	}
}
