namespace FoodDelivery.Entities.FilterParams
{
	public class BaseFilterParams
	{
		public int CurrentPage { get; set; }
		public int ItemsPerPage { get; set; }
		public string Search { get; set; }
	}
}
