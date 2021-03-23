using System.Collections.Generic;

namespace FoodDelivery.Entities.Params
{
	public class DishParams
	{
		public List<string> Restaurants { get; set; }
		public List<string> Categories { get; set; }
		public string Search { get; set; }
	}
}
