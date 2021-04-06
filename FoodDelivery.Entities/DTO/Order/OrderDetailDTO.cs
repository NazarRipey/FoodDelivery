using System;
using System.Collections.Generic;
using FoodDelivery.Entities.Enums;
using FoodDelivery.Entities.Enums.Status;

namespace FoodDelivery.Entities.DTO.Order
{
	public class OrderDetailDTO
	{
		public Guid Id { get; set; }
		public int OrderNumber { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime? ClosedDate { get; set; }
		public PaymentType PaymentType { get; set; }
		public string Address { get; set; }
		public OrderStatus Status { get; set; }
		public int TotalSum { get; set; }
		public string Comment { get; set; }

		public ICollection<OrderItemDTO> OrderItems { get; set; }
	}
}
