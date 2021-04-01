using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodDelivery.DAL.EF.Entities
{
	public class OrderItem
	{
		[Key]
		public Guid Id { get; set; }
		[ForeignKey("Order")]
		public Guid OrderId { get; set; }
		[ForeignKey("Dish")]
		public Guid DishId { get; set; }
		public int Quantity { get; set; }
		public virtual Order Order { get; set; }
		public virtual Dish Dish { get; set; }
	}
}
