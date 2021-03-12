using System.Threading.Tasks;
using AutoMapper;
using FoodDelivery.API.Models;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums;
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

		public AuthenticationController(UserManager<IdentityUser> userManager,
			IMapper mapper,
			IUserProfileFacade userProfileFacade,
			SignInManager<IdentityUser> signInManager)
		{
			_userManager = userManager;
			_mapper = mapper;
			_userProfileFacade = userProfileFacade;
			_signInManager = signInManager;
		}

		[HttpGet]
		[Route("user")]
		[Authorize]
		public async Task<ActionResult<UserLoggedInModel>> GetUser()
		{
			IdentityUser user = await _userManager.GetUserAsync(User);
			if (user == null)
			{
				return null;
			}

			UserProfile userProfile = _userProfileFacade.GetByEmail(user.Email);

			//Not with mapper because of roles
			UserLoggedInModel userLoggedInModel = new UserLoggedInModel
			{
				FirstName = userProfile.FirstName,
				LastName = userProfile.LastName,
				Birthday = userProfile.Birthday.ToString(),
				Email = userProfile.Email,
				PhoneNumber = userProfile.PhoneNumber,
				Address = userProfile.Address,
				Roles = await _userManager.GetRolesAsync(user)
			};

			return userLoggedInModel;
		}

		[HttpPost]
		[Route("signup")]
		public async Task<IActionResult> SignUp([FromBody] SignUpModel signUpModel)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(Errors.ModelInvalid);
			}

			if ((await _userManager.FindByEmailAsync(signUpModel.Email)) != null)
			{
				return BadRequest(Errors.AlreadyExistsEmail);
			}

			if (_userProfileFacade.GetByPhone(signUpModel.PhoneNumber) != null)
			{
				return BadRequest(Errors.AlreadyExistsPhone);
			}

			UserProfileDTO userProfileDTO = _mapper.Map<UserProfileDTO>(signUpModel);
			IdentityUser user = _mapper.Map<IdentityUser>(userProfileDTO);

			IdentityResult result = await _userManager.CreateAsync(user, signUpModel.Password);

			if (result.Succeeded)
			{
				await _userManager.AddToRolesAsync(user, signUpModel.Roles);

				UserProfile userProfile = _mapper.Map<UserProfile>(userProfileDTO);
				userProfile.AspNetUserId = user.Id;

				_userProfileFacade.Create(userProfile);

				return Ok();
			}
			return BadRequest(result.Errors);
		}

		[HttpPost]
		[Route("sendcode")]
		public async Task<IActionResult> SendEmailConfirmationCode([FromBody] SendCodeModel sendCode)
		{
			//Should it be async here?
			await _userProfileFacade.SendEmailConfirmationCodeAsync(sendCode.Email);

			return Ok();
		}

		[HttpPost]
		[Route("confirmemail")]
		public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailModel confirmEmailModel)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(Errors.ModelInvalid);
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

			return BadRequest(Errors.WrongConfirmationCode);
		}

		[HttpPost]
		[Route("login")]
		public async Task<IActionResult> LogIn([FromBody] LogInModel logInModel)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(Errors.ModelInvalid);
			}

			IdentityUser user = await _userManager.FindByEmailAsync(logInModel.Email);
			if (user == null)
			{
				return BadRequest(Errors.WrongEmailPassword);
			}

			if (!await _userManager.CheckPasswordAsync(user, logInModel.Password))
			{
				return BadRequest(Errors.WrongEmailPassword);
			}

			if (!await _userManager.IsEmailConfirmedAsync(user))
			{
				return BadRequest(Errors.EmailNotConfirmed);
			}

			var result = await _signInManager.PasswordSignInAsync
				(user, logInModel.Password, logInModel.RememberMe, false);

			if (result.Succeeded)
			{
				return Ok();
			}

			return BadRequest(Errors.CannotSignIn);
		}

		[HttpPost]
		[Route("logout")]
		public async Task<IActionResult> LogOut()
		{
			await _signInManager.SignOutAsync();
			return Ok();
		}

		/*[HttpGet("{id}")]
		public string Get(int id)
		{
			return "value";
		}

		// POST api/<AuthenticationController>
		[HttpPost]
		public void Post([FromBody] string value)
		{
		}

		// PUT api/<AuthenticationController>/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody] string value)
		{
		}

		// DELETE api/<AuthenticationController>/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}*/
	}
}
