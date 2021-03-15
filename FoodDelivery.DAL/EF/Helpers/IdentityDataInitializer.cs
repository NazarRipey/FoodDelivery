using System;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.DAL.Repositories;
using Microsoft.AspNetCore.Identity;

namespace FoodDelivery.DAL.EF.Helpers
{
	public static class IdentityDataInitializer
	{
		public static void AddAdminAsync(
			UserManager<IdentityUser> userManager,
			IUserProfileRepository profileRepository)
		{
			if (userManager.FindByEmailAsync("admin@mailinator.com").Result == null)
			{
				IdentityUser admin = new IdentityUser
				{
					Id = Guid.NewGuid().ToString(),
					Email = "admin@mailinator.com",
					UserName = "admin@mailinator.com",
					EmailConfirmed = true,
					PhoneNumber = "+380670000000"
				};

				var result = userManager.CreateAsync(admin, "Admin123").Result;
				if (result.Succeeded)
				{
					var roleResult = userManager.AddToRoleAsync(admin, "admin").Result;

					if (roleResult.Succeeded)
					{
						UserProfile adminProfile = new UserProfile()
						{
							Id = Guid.NewGuid(),
							AspNetUserId = admin.Id,
							FirstName = "admin",
							LastName = "admin",
							Birthday = new DateTime(1991, 1, 1),
							Email = "admin@mailinator.com",
							PhoneNumber = "+380670000000",
							EmailConfirmationCode = 1111
						};

						profileRepository.Create(adminProfile);
					}
				}
			}
		}
	}
}
