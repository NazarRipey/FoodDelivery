using FoodDelivery.DAL.EF.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.EF.Context
{
	public class FoodDeliveryDbContext : IdentityDbContext, IFoodDeliveryDbContext
	{
		public DbSet<UserProfile> UserProfile { get; set; }
		public DbSet<OwnerRequest> OwnerRequest { get; set; }

		public FoodDeliveryDbContext(DbContextOptions<FoodDeliveryDbContext> options)
			: base(options)
		{
			Database.EnsureCreated();
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<IdentityRole>().HasData(
				new IdentityRole { Name = "admin", NormalizedName = "ADMIN" },
				new IdentityRole { Name = "customer", NormalizedName = "CUSTOMER" },
				new IdentityRole { Name = "owner", NormalizedName = "OWNER" }
			);

			modelBuilder.Entity<UserProfile>(up =>
			{
				up.HasIndex(u => u.AspNetUserId)
					.IsUnique();
			});
		}
	}
}
