using FoodDelivery.Entities.Enums.Status;

namespace FoodDelivery.Entities.FilterParams
{
	public class OwnerRequestFilterParams : BaseFilterParams
	{
		public OwnerRequestStatus? Status { get; set; }
	}
}
