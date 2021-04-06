using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Restaurant;
using FoodDelivery.Entities.Enums.Sorts;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.Repositories
{
	public class RestaurantRepository : BaseRepository, IRestaurantRepository
	{
		public RestaurantRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public void Create(RestaurantAddDTO restaurantAddDTO)
		{
			Restaurant restaurant = _mapper.Map<Restaurant>(restaurantAddDTO);

			restaurant.Status = (int)RestaurantStatus.AwaitingApproval;
			//занулення щоб не додавалось в бд, в мапері не працює
			restaurant.Type = null;
			_db.Restaurant.Add(restaurant);

			SaveChanges();
		}

		public RestaurantListResponseDTO Retrieve(RestaurantFilterParams filterParams)
		{
			int totalItemsCount;
			IQueryable<Restaurant> restaurants = _db.Restaurant.Where(r => r.Status == (int)RestaurantStatus.Active);

			if (filterParams.Search != null)
			{
				restaurants = restaurants
					.Where(r => r.Name.Contains(filterParams.Search) || r.Description.Contains(filterParams.Search));
			}
			if (filterParams.Types.Count > 0)
			{
				restaurants = restaurants.Where(r => filterParams.Types.Contains(r.Type.Name));

			}

			totalItemsCount = restaurants.Count();

			switch (filterParams.RestaurantSortType)
			{
				case RestaurantSortType.Name:
					restaurants = restaurants.OrderBy(r => r.Name);
					break;
				case RestaurantSortType.Rating:
				default:
					restaurants = restaurants.OrderBy(r => r.Rating);
					break;
			}

			ICollection<Restaurant> restaurantsToReturn = restaurants
				.Skip(filterParams.ItemsPerPage * (filterParams.CurrentPage - 1))
				.Take(filterParams.ItemsPerPage)
				.ToList();

			ICollection<RestaurantListDTO> restaurantDTOs =
				_mapper.Map<ICollection<RestaurantListDTO>>(restaurantsToReturn);

			RestaurantListResponseDTO restaurantListResponseDTO = new RestaurantListResponseDTO()
			{
				Restaurants = restaurantDTOs,
				TotalRestaurantsCount = totalItemsCount
			};

			return restaurantListResponseDTO;
		}

		public ICollection<string> GetAllNames()
		{
			ICollection<string> names = _db.Restaurant
				.Where(r => r.Status == (int)RestaurantStatus.Active)
				.Select(r => r.Name)
				.ToList();

			return names;
		}

		public RestaurantDetailDTO GetByName(string name)
		{
			Restaurant restaurant = _db.Restaurant.
				Where(r => r.Name == name)
				.Include(r => r.Addresses)
				.Include(r => r.Type)
				.Include(r => r.Dishes)
				.SingleOrDefault();


			//FILTERING INCLUDE ?
			if(restaurant != null)
			{
				restaurant.Dishes = restaurant.Dishes.Where(d => d.Status == (int)DishStatus.Active).ToList();
			}

			RestaurantDetailDTO restaurantDTO = _mapper.Map<RestaurantDetailDTO>(restaurant);

			return restaurantDTO;
		}

		public RestaurantOwnerDetailResponseDTO RetrieveMyRestaurants(MyRestaurantsFilterParams filterParams, Guid ownerId)
		{
			int totalItemsCount;

			IQueryable<Restaurant> restaurants = _db.Restaurant.Where(r => r.OwnerId == ownerId);

			totalItemsCount = restaurants.Count();

			ICollection<Restaurant> restaurantsToReturn = restaurants
				.Skip(filterParams.ItemsPerPage * (filterParams.CurrentPage - 1))
				.Take(filterParams.ItemsPerPage)
				.ToList();

			ICollection<RestaurantOwnerDetailDTO> restaurantDetailDTOs =
				_mapper.Map<ICollection<RestaurantOwnerDetailDTO>>(restaurantsToReturn);

			RestaurantOwnerDetailResponseDTO restaurantDetailResponseDTO = new RestaurantOwnerDetailResponseDTO()
			{
				TotalRestaurantsCount = totalItemsCount,
				Restaurants = restaurantDetailDTOs
			};

			return restaurantDetailResponseDTO;
		}

		public ICollection<RestaurantListDTO> GetTop(int count)
		{
			List<Restaurant> topRestaurants = _db.Restaurant
				.OrderBy(r => r.Rating)
				.Take(count)
				.ToList();

			ICollection<RestaurantListDTO> topRestaurantsDTOs = _mapper
				.Map<ICollection<RestaurantListDTO>>(topRestaurants);

			return topRestaurantsDTOs;
		}

		public void Remove(Guid restaurantId)
		{
			Restaurant restaurant = _db.Restaurant.Find(restaurantId);
			_db.Restaurant.Remove(restaurant);

			SaveChanges();
		}

		public void Update(RestaurantUpdateDTO restaurantUpdateDTO)
		{
			Restaurant restaurant = _db.Restaurant.Find(restaurantUpdateDTO.Id);

			restaurant.Description = restaurantUpdateDTO.Description;

			_db.Entry(restaurant).State = EntityState.Modified;

			SaveChanges();
		}

		public void UpdateStatus(Guid id, int statusId)
		{
			Restaurant restaurant = _db.Restaurant.Find(id);
			restaurant.Status = statusId;

			_db.Entry(restaurant).State = EntityState.Modified;

			SaveChanges();
		}

		public RestaurantUpdateDTO GetUpdateDTOById(Guid id)
		{
			Restaurant restaurant = _db.Restaurant.Find(id);
			RestaurantUpdateDTO restaurantUpdateDTO = _mapper.Map<RestaurantUpdateDTO>(restaurant);

			return restaurantUpdateDTO;
		}
	}
}
