using FoodDelivery.DAL.EF.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.EF.Context
{
	public class FoodDeliveryDbContext : IdentityDbContext<User>
	{
		public FoodDeliveryDbContext(DbContextOptions<FoodDeliveryDbContext> options)
			: base(options)
		{
			Database.EnsureCreated();
		}
	}
}
