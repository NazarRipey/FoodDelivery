using System;

namespace FoodDelivery.Entities.DTO
{
	public class OwnerRequestDTO
	{
		public Guid Id { get; set; }
		public Guid UserProfileId { get; set; }

		public DateTime CreatedDate { get; set; }

		public DateTime? ClosedDate { get; set; }

		public int Status { get; set; }

		public virtual UserShortProfileDTO UserProfile { get; set; }
	}
}
