using FoodDelivery.Entities.Enums.Status;

namespace FoodDelivery.Entities.FilterParams
{
	public class OrderFilterParams : BaseFilterParams
	{
		public OrderStatus? Status { get; set; }
	}
}
