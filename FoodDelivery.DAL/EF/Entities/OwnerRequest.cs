using System;
using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.DAL.EF.Entities
{
	public class OwnerRequest
	{
		[Key]
		public Guid Id { get; set; }

		public Guid UserProfileId { get; set; }

		public int Status { get; set; }

		public DateTime CreatedDate { get; set; }

		public DateTime? ClosedDate { get; set; }

		public virtual UserProfile UserProfile { get; set; }
	}
}
