using System.Collections.Generic;
using FoodDelivery.Entities.Enums.Sorts;

namespace FoodDelivery.Entities.FilterParams
{
	public class DishFilterParams : BaseFilterParams
	{
		public List<string> Restaurants { get; set; }
		public List<string> Categories { get; set; }
		public decimal? MinPrice { get; set; }
		public decimal? MaxPrice { get; set; }
		public DishSortType DishSortType { get; set; }
	}
}
