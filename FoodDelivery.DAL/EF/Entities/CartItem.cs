using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodDelivery.DAL.EF.Entities
{
	public class CartItem
	{
		[Key]
		public Guid Id { get; set; }
		[ForeignKey("Cart")]
		public Guid CartId { get; set; }
		[ForeignKey("Dish")]
		public Guid DishId { get; set; }
		public int Quantity { get; set; }
		public virtual Cart Cart { get; set; }
		public virtual Dish Dish { get; set; }
	}
}
