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
		public DbSet<Cart> Cart { get; set; }
		public DbSet<CartItem> CartItem { get; set; }
		public DbSet<Order> Order { get; set; }
		public DbSet<OrderItem> OrderItem { get; set; }
		public DbSet<RestaurantRating> RestaurantRating { get; set; }
		public DbSet<DishRating> DishRating { get; set; }
		public DbSet<RestaurantOrder> RestaurantOrder { get; set; }
		public DbSet<RestaurantOrderItem> RestaurantOrderItem { get; set; }
	}
}
