using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums.Sorts;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;
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
			dish.Status = (int)DishStatus.Active;

			//занулення щоб не додавалось в бд, в мапері не працює
			dish.Category = null;
			_db.Dish.Add(dish);

			SaveChanges();
		}

		public DishCartDTO GetCartDTOById(Guid id)
		{
			Dish dish = _db.Dish.Find(id);
			DishCartDTO dishCartDTO = _mapper.Map<DishCartDTO>(dish);

			return dishCartDTO;
		}

		public DishDetailDTO GetDetailDTOById(Guid id)
		{
			Dish dish = _db.Dish.Find(id);
			DishDetailDTO dishDetailDTO = _mapper.Map<DishDetailDTO>(dish);

			return dishDetailDTO;
		}

		public DishListResponseDTO Retrieve(DishFilterParams filterParams)
		{
			int totalItemsCount;
			decimal? maxPrice = null, minPrice = null;

			IQueryable<Dish> dishes = _db.Dish.Where(d => d.Status == (int)DishStatus.Active
				&& d.Restaurant.Status == (int)RestaurantStatus.Active);

			if (dishes.Count() != 0)
			{
				minPrice = dishes.Min(dishes => dishes.Price);
				maxPrice = dishes.Max(dishes => dishes.Price);
			}

			if (filterParams.Search != null)
			{
				dishes = dishes
					.Where(d => d.Name.Contains(filterParams.Search) || d.Description.Contains(filterParams.Search));
			}
			if (filterParams.Categories.Count > 0)
			{
				dishes = dishes.Where(d => filterParams.Categories.Contains(d.Category.Name));
			}
			if (filterParams.Restaurants.Count > 0)
			{
				dishes = dishes.Where(d => filterParams.Restaurants.Contains(d.Restaurant.Name));
			}
			if (filterParams.MinPrice != null)
			{
				dishes = dishes.Where(d => d.Price >= filterParams.MinPrice);
			}
			if (filterParams.MaxPrice != null)
			{
				dishes = dishes.Where(d => d.Price <= filterParams.MaxPrice);
			}

			switch (filterParams.DishSortType)
			{
				case DishSortType.CheapFirst:
					dishes = dishes.OrderBy(d => d.Price);
					break;
				case DishSortType.ExpensiveFirst:
					dishes = dishes.OrderByDescending(d => d.Price);
					break;
				case DishSortType.Name:
					dishes = dishes.OrderBy(d => d.Name);
					break;
				case DishSortType.Weight:
					dishes = dishes.OrderByDescending(d => d.Weight);
					break;
				case DishSortType.Rating:
				default:
					dishes = dishes.OrderBy(d => d.Rating);
					break;
			}

			totalItemsCount = dishes.Count();

			ICollection<Dish> dishesToReturn = dishes
				.Skip(filterParams.ItemsPerPage * (filterParams.CurrentPage - 1))
				.Take(filterParams.ItemsPerPage)
				.ToList();

			ICollection<DishListDTO> dishDTOs = _mapper.Map<ICollection<DishListDTO>>(dishesToReturn);

			DishListResponseDTO dishListResponseDTO = new DishListResponseDTO()
			{
				Dishes = dishDTOs,
				TotalDishesCount = totalItemsCount,
				MinPrice = minPrice,
				MaxPrice = maxPrice
			};

			return dishListResponseDTO;
		}

		public DishListDTO GetByNameWithinRestaurant(string name, Guid restaurantId)
		{
			Dish dish = _db.Dish.Where(d => d.RestaurantId == restaurantId && d.Name == name).SingleOrDefault();
			DishListDTO dishDTO = _mapper.Map<DishListDTO>(dish);

			return dishDTO;
		}

		public ICollection<DishListDTO> GetTop(int count)
		{
			List<Dish> topDishes = _db.Dish
				.OrderBy(d => d.Rating)
				.Take(count)
				.ToList();

			ICollection<DishListDTO> topDishDTOs = _mapper
				.Map<ICollection<DishListDTO>>(topDishes);

			return topDishDTOs;
		}

		public void Update(DishDTO dishDTO)
		{
			Dish dish = _mapper.Map<Dish>(dishDTO);
			_db.Entry(dish).State = EntityState.Modified;

			SaveChanges();
		}

		public void Remove(Guid id)
		{
			Dish dish = _db.Dish.Find(id);
			_db.Dish.Remove(dish);

			SaveChanges();
		}

		public void UpdateStatus(Guid id, int status)
		{
			Dish dish = _db.Dish.Find(id);
			dish.Status = status;

			_db.Entry(dish).State = EntityState.Modified;

			SaveChanges();
		}
	}
}
