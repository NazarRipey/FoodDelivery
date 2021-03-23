using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Params;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.Repositories
{
	public class DishRepository : BaseRepository, IDishRepository
	{
		public DishRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public void Create(DishDTO dishDTO)
		{
			Dish dish = _mapper.Map<Dish>(dishDTO);


			//Занулення navigation property
			//?????
			dish.Category = null;
			dish.Restaurant = null;


			_db.Dish.Add(dish);

			_db.SaveChanges();
		}

		public ICollection<DishDTO> GetAll(DishParams dishParam = null)
		{
			IQueryable<Dish> dishes = _db.Dish;

			if (dishParam != null)
			{
				if (dishParam.Search != null)
				{
					dishes = dishes
						.Where(d => d.Name.Contains(dishParam.Search) || d.Description.Contains(dishParam.Search));
				}

				if (dishParam.Categories.Count > 0)
				{
					dishes = dishes.Where(d => dishParam.Categories.Contains(d.Category.Name));
				}
				if (dishParam.Restaurants.Count > 0)
				{
					dishes = dishes.Where(d => dishParam.Restaurants.Contains(d.Restaurant.Name));
				}
			}

			ICollection<DishDTO> dishDTOs = _mapper.Map<ICollection<DishDTO>>(dishes);

			return dishDTOs;
		}

		public DishDTO GetByNameWithinRestaurant(string name, Guid restaurantId)
		{
			Dish dish = _db.Dish.Where(d => d.RestaurantId == restaurantId && d.Name == name).SingleOrDefault();
			DishDTO dishDTO = _mapper.Map<DishDTO>(dish);

			return dishDTO;
		}

		public ICollection<DishCategoryDTO> GetCategories()
		{
			ICollection<DishCategoryDTO> dishCategoryDTOs =
				_mapper.Map<ICollection<DishCategoryDTO>>(_db.DishCategory);

			return dishCategoryDTOs;
		}

		public ICollection<DishDTO> GetTop(int count)
		{
			List<Dish> topDishes = _db.Dish
				.OrderBy(d => d.Rating)
				.Take(count)
				.ToList();

			ICollection<DishDTO> topDishDTOs = _mapper
				.Map<ICollection<DishDTO>>(topDishes);

			return topDishDTOs;
		}

		public void Remove(Guid id)
		{
			Dish dish = _db.Dish.Find(id);
			_db.Dish.Remove(dish);

			_db.SaveChanges();
		}

		public void Update(DishDTO dishDTO)
		{
			Dish dish = _mapper.Map<Dish>(dishDTO);
			_db.Entry(dish).State = EntityState.Modified;

			SaveChanges();
		}
	}
}
