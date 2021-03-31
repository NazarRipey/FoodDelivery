using System;
using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.DAL.EF.Entities
{
	public class RestaurantAddress
	{
		[Key]
		public Guid Id { get; set; }
		public Guid RestaurantId { get; set; }
		public string City { get; set; }
		public string Address { get; set; }
		public virtual Restaurant Restaurant { get; set; }
	}
}
