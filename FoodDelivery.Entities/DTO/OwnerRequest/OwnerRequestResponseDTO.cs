using System.Collections.Generic;

namespace FoodDelivery.Entities.DTO
{
	public class OwnerRequestResponseDTO
	{
		public ICollection<OwnerRequestDTO> OwnerRequests { get; set; }
		public int TotalRequestsCount { get; set; }
	}
}
