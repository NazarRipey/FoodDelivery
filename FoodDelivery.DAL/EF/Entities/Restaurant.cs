using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodDelivery.DAL.EF.Entities
{
	public class Restaurant
	{
		[Key]
		public Guid Id { get; set; }

		public Guid OwnerId { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }

		public double? Rating { get; set; }

		[ForeignKey("Type")]
		public int TypeId { get; set; }

		public virtual RestaurantType Type { get; set; }

		public virtual List<RestaurantAddress> Addresses { get; set; }
	}
}
