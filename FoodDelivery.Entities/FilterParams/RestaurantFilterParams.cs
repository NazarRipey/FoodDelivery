using System.Collections.Generic;
using FoodDelivery.Entities.Enums.Sorts;

namespace FoodDelivery.Entities.FilterParams
{
	public class RestaurantFilterParams : BaseFilterParams
	{
		public List<string> Types { get; set; }
		public RestaurantSortType RestaurantSortType { get; set; }
	}
}
