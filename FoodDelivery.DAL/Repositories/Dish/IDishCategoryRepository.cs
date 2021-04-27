using System.Collections.Generic;
using FoodDelivery.Entities.DTO;

namespace FoodDelivery.DAL.Repositories
{
	public interface IDishCategoryRepository
	{
		ICollection<DishCategoryDTO> GetCategories();
		ICollection<int> GetRestrictedCategoriesIds();
	}
}
