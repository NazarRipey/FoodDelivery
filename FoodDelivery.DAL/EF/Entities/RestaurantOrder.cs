using System;
using System.Collections.Generic;

namespace FoodDelivery.DAL.EF.Entities
{
	public class RestaurantOrder
	{
		public Guid Id { get; set; }
		public Guid RestaurantId { get; set; }
		public Guid OrderId { get; set; }
		public int Status { get; set; }

		public virtual Restaurant Restaurant { get; set; }
		public virtual Order Order { get; set; }
		public virtual List<RestaurantOrderItem> RestaurantOrderItems { get; set; }
	}
}
