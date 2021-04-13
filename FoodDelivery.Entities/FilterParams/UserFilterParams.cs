using FoodDelivery.Entities.Enums.Status;

namespace FoodDelivery.Entities.FilterParams
{
	public class UserFilterParams : BaseFilterParams
	{
		public AccountStatus? Status { get; set; }
	}
}
