using System;
using FoodDelivery.Entities.Enums;

namespace FoodDelivery.Entities.DTO
{
	public class OwnerRequestDTO
	{
		public Guid Id { get; set; }
		public Guid UserProfileId { get; set; }

		public DateTime CreatedDate { get; set; }

		public DateTime? ClosedDate { get; set; }

		public RoleRequestStatus Status { get; set; }

		public virtual UserProfileDTO UserProfile { get; set; }
	}
}
