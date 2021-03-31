using System.Collections.Generic;
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

	}
}
