using System;
using System.Threading.Tasks;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.UserProfile;
using FoodDelivery.Entities.FilterParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FoodDelivery.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class AccountController : ControllerBase
	{
		private readonly UserManager<IdentityUser> _userManager;
		private readonly IUserProfileFacade _userProfileFacade;
		private readonly IRestaurantFacade _restaurantFacade;
		private readonly IRestaurantRequestFacade _restaurantRequestFacade;

		public AccountController(UserManager<IdentityUser> userManager,
			IUserProfileFacade userProfileFacade,
			IRestaurantFacade restaurantFacade,
			IRestaurantRequestFacade restaurantRequestFacade)
		{
			_userManager = userManager;
			_userProfileFacade = userProfileFacade;
			_restaurantFacade = restaurantFacade;
			_restaurantRequestFacade = restaurantRequestFacade;
		}

		[HttpGet]
		[Route("user/{id}")]
		[Authorize(Roles = "admin")]
		public UserAccountDTO GetUserAccountById(Guid id)
		{
			return _userProfileFacade.GetAccountById(id);
		}

		[HttpPost]
		[Route("managers")]
		[Authorize(Roles = "admin")]
		public UserListResponseDTO RetrieveOrderManagers(UserFilterParams filterParams)
		{
			return _userProfileFacade.RetrieveByRole(filterParams, "orderManager");
		}

		[HttpPost]
		[Route("users")]
		[Authorize(Roles = "admin")]
		public UserListResponseDTO RetrieveUsers(UserFilterParams filterParams)
		{
			return _userProfileFacade.RetrieveUsers(filterParams);
		}

		[HttpPost]
		[Route("activate")]
		[Authorize(Roles = "admin")]
		public async Task<IActionResult> ActivateAccountAsync([FromBody] string email)
		{
			try
			{
				IdentityUser user = await _userManager.FindByNameAsync(email);
				await _userManager.SetLockoutEndDateAsync(user, null);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpPost]
		[Route("deactivate")]
		public async Task<IActionResult> DeactivateAccountAsync([FromBody] string email)
		{
			try
			{
				IdentityUser user = await _userManager.FindByNameAsync(email);
				await _userManager.SetLockoutEndDateAsync(user, new DateTimeOffset(DateTime.MaxValue));

				_restaurantFacade.DeactivateByEmail(user.Email);
				_restaurantRequestFacade.DeclineAwaitingByEmail(user.Email);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpPut]
		[Route("update")]
		public IActionResult UpdateProfile([FromBody] UpdateProfileDTO updateProfile)
		{
			try
			{
				_userProfileFacade.UpdateProfile(updateProfile);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}
	}
}
