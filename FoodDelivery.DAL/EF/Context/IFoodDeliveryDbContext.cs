using FoodDelivery.DAL.EF.Entities;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.EF.Context
{
	interface IFoodDeliveryDbContext
	{
		public DbSet<UserProfile> UserProfile { get; set; }
		public DbSet<OwnerRequest> OwnerRequest { get; set; }
		public DbSet<RestaurantRequest> RestaurantRequest { get; set; }
		public DbSet<Restaurant> Restaurant { get; set; }
		public DbSet<RestaurantAddress> RestaurantAddress { get; set; }
		public DbSet<RestaurantType> RestaurantType { get; set; }
		public DbSet<Dish> Dish { get; set; }
		public DbSet<DishCategory> DishCategory { get; set; }
	}
}
