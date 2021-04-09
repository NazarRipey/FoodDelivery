using System;
using FoodDelivery.Entities.Enums.Status;

namespace FoodDelivery.Entities.DTO.Order
{
	public class OrderManagerDTO
	{
		public Guid Id { get; set; }
		public int OrderNumber { get; set; }
		public string CustomerName { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime? ClosedDate { get; set; }
		public string ContactPhoneNumber { get; set; }
		public OrderStatus Status { get; set; }
		public int TotalSum { get; set; }
	}
}
