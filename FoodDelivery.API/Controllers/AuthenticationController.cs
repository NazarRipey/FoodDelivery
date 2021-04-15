using System;
using System.Threading.Tasks;
using AutoMapper;
using FoodDelivery.API.Models;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums.Errors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FoodDelivery.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[AllowAnonymous]
	public class AuthenticationController : ControllerBase
	{
		private readonly UserManager<IdentityUser> _userManager;
		private readonly IMapper _mapper;
		private readonly IUserProfileFacade _userProfileFacade;
		private readonly SignInManager<IdentityUser> _signInManager;
		private readonly IOwnerRequestFacade _ownerRequestFacade;

		public AuthenticationController(UserManager<IdentityUser> userManager,
			IMapper mapper,
			IUserProfileFacade userProfileFacade,
			SignInManager<IdentityUser> signInManager,
			IOwnerRequestFacade ownerRequestFacade)
		{
			_userManager = userManager;
			_mapper = mapper;
			_userProfileFacade = userProfileFacade;
			_signInManager = signInManager;
			_ownerRequestFacade = ownerRequestFacade;
		}

		[HttpGet]
		[Route("user")]
		[Authorize]
		public async Task<ActionResult<UserProfileDTO>> GetUser()
		{
			IdentityUser user = await _userManager.GetUserAsync(User);
			if (user == null)
			{
				return null;
			}

			UserProfile userProfile = _userProfileFacade.GetByEmail(user.Email);

			UserProfileDTO userProfileDTO = new UserProfileDTO
			{
				Id = userProfile.Id,
				FirstName = userProfile.FirstName,
				LastName = userProfile.LastName,
				Birthday = userProfile.Birthday,
				Email = userProfile.Email,
				PhoneNumber = userProfile.PhoneNumber,
				Address = userProfile.Address,
				Roles = await _userManager.GetRolesAsync(user)
			};

			return userProfileDTO;
		}

		//Adding manager here. Should there be another method with [Role(admin)] attribute?
		[HttpPost]
		[Route("signup")]
		public async Task<IActionResult> SignUp([FromBody] SignUpModel signUpModel)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(SignUpErrors.ModelInvalid);
			}

			if ((await _userManager.FindByEmailAsync(signUpModel.Email)) != null)
			{
				return BadRequest(SignUpErrors.AlreadyExistsEmail);
			}

			if (_userProfileFacade.GetByPhone(signUpModel.PhoneNumber) != null)
			{
				return BadRequest(SignUpErrors.AlreadyExistsPhone);
			}

			UserProfile userProfile = _mapper.Map<UserProfile>(signUpModel);
			IdentityUser user = _mapper.Map<IdentityUser>(userProfile);

			user.Id = Guid.NewGuid().ToString();

			IdentityResult result = await _userManager.CreateAsync(user, signUpModel.Password);

			if (result.Succeeded)
			{
				//Mapping here and not in repo because need to set AspNetUserId
				userProfile.AspNetUserId = user.Id;
				userProfile.Id = Guid.NewGuid();

				_userProfileFacade.Create(userProfile);

				foreach (string role in signUpModel.Roles)
				{
					if (role == "owner")
					{
						_ownerRequestFacade.Create(userProfile.Id);
					}
					else
					{
						await _userManager.AddToRoleAsync(user, role);
					}

					if (role == "orderManager")
					{
						await _userProfileFacade.SendPasswordToEmail(signUpModel.Email, signUpModel.Password);
					}
				}

				return Ok();
			}
			return BadRequest(result.Errors);
		}

		[HttpPost]
		[Route("sendcode")]
		public async Task<IActionResult> SendEmailConfirmationCode([FromBody] string email)
		{
			await _userProfileFacade.SendEmailConfirmationCodeAsync(email);

			return Ok();
		}

		[HttpPost]
		[Route("confirmemail")]
		public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailModel confirmEmailModel)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ConfirmEmailErrors.ModelInvalid);
			}

			UserProfile userProfile = _userProfileFacade.GetByEmail(confirmEmailModel.Email);

			if (confirmEmailModel.Code == userProfile.EmailConfirmationCode)
			{
				IdentityUser user = await _userManager.FindByEmailAsync(confirmEmailModel.Email);
				user.EmailConfirmed = true;

				IdentityResult result = await _userManager.UpdateAsync(user);

				if (result.Succeeded)
				{
					return Ok();
				}

				return BadRequest(result.Errors);
			}

			return BadRequest(ConfirmEmailErrors.WrongConfirmationCode);
		}

		[HttpPost]
		[Route("login")]
		public async Task<IActionResult> LogIn([FromBody] LogInModel logInModel)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(LogInErrors.ModelInvalid);
			}

			IdentityUser user = await _userManager.FindByEmailAsync(logInModel.Email);
			if (user == null)
			{
				return BadRequest(LogInErrors.WrongEmailPassword);
			}

			if (!await _userManager.CheckPasswordAsync(user, logInModel.Password))
			{
				return BadRequest(LogInErrors.WrongEmailPassword);
			}

			if (!await _userManager.IsEmailConfirmedAsync(user))
			{
				return BadRequest(LogInErrors.EmailNotConfirmed);
			}

			var result = await _signInManager.PasswordSignInAsync
				(user, logInModel.Password, logInModel.RememberMe, false);

			if (result.Succeeded)
			{
				return Ok();
			}
			if (result.IsLockedOut)
			{
				return BadRequest(LogInErrors.AccountDeactivated);
			}

			return BadRequest(LogInErrors.CannotLogIn);
		}

		[HttpPost]
		[Route("logout")]
		public async Task<IActionResult> LogOut()
		{
			await _signInManager.SignOutAsync();
			return Ok();
		}
	}
}
