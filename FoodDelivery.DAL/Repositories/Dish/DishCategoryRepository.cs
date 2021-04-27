using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.Entities.DTO;

namespace FoodDelivery.DAL.Repositories
{
	public class DishCategoryRepository : BaseRepository, IDishCategoryRepository
	{
		public DishCategoryRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public ICollection<DishCategoryDTO> GetCategories()
		{
			ICollection<DishCategoryDTO> dishCategories =
				_mapper.Map<ICollection<DishCategoryDTO>>(_db.DishCategory);

			return dishCategories;
		}

		public ICollection<int> GetRestrictedCategoriesIds()
		{
			ICollection<int> restrictedCategories = _db.DishCategory
				.Where(c => c.Name == "Alcoholic beverage")
				.Select(c => c.Id)
				.ToList();

			return restrictedCategories;
		}
	}
}
