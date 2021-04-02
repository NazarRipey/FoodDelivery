using System;
using System.Collections.Generic;
using FoodDelivery.Entities.Enums.Status;

namespace FoodDelivery.Entities.DTO.Order
{
	public class OrderShortDTO
	{
		public Guid Id { get; set; }
		public int OrderNumber { get; set; }
		public OrderStatus Status { get; set; }
		public int TotalSum { get; set; }
		public ICollection<OrderItemDTO> OrderItems { get; set; }
	}
}
