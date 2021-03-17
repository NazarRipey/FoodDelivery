using FoodDelivery.DAL.EF.Entities;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.EF.Context
{
	interface IFoodDeliveryDbContext
	{
		public DbSet<UserProfile> UserProfile { get; set; }
		public DbSet<OwnerRequest> OwnerRequest { get; set; }
	}
}
