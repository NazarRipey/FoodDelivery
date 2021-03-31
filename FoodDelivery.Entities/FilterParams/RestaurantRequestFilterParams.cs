using FoodDelivery.Entities.Enums.Sorts;
using FoodDelivery.Entities.Enums.Status;

namespace FoodDelivery.Entities.FilterParams
{
	public class RestaurantRequestFilterParams : BaseFilterParams
	{
		public RestaurantRequestStatus? Status { get; set; }
		public bool? Asc { get; set; }
		public RestaurantRequestSortType? Sort { get; set; }
	}
}
