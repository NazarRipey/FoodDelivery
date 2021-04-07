using FoodDelivery.Entities.Enums.Status;

namespace FoodDelivery.Entities.FilterParams
{
	public class OrderManagerFilterParams : BaseFilterParams
	{
		public AccountStatus? Status { get; set; }
	}
}
