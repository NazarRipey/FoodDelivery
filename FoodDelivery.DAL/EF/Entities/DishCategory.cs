using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.DAL.EF.Entities
{
	public class DishCategory
	{
		[Key]
		public int Id { get; set; }

		public string Name { get; set; }
	}
}
