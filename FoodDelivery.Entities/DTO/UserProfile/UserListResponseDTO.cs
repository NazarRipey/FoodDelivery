using System.Collections.Generic;
using FoodDelivery.Entities.DTO.UserProfile;

namespace FoodDelivery.Entities.DTO
{
	public class UserListResponseDTO
	{
		public ICollection<UserAccountDTO> Users { get; set; }
		public int TotalUsersCount { get; set; }
	}
}
