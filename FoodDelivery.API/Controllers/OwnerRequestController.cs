using System;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FoodDelivery.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize(Roles = "admin")]
	public class OwnerRequestController : ControllerBase
	{
		private readonly IOwnerRequestFacade _ownerRequestFacade;

		public OwnerRequestController(IOwnerRequestFacade ownerRequestFacade)
		{
			_ownerRequestFacade = ownerRequestFacade;
		}

		[HttpGet]
		[AllowAnonymous]
		[Route("status")]
		public OwnerRequestStatus? GetStatus(Guid id)
		{
			return _ownerRequestFacade.GetStatus(id);
		}

		[HttpPost]
		[Route("retrieve")]
		public OwnerRequestResponseDTO Retrieve(OwnerRequestFilterParams filterParam)
		{
			return _ownerRequestFacade.Retrieve(filterParam);
		}

		[HttpPost]
		[Route("approve")]
		public IActionResult Approve([FromBody] Guid id)
		{
			try
			{
				_ownerRequestFacade.Approve(id);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpPost]
		[Route("decline")]
		public IActionResult Decline([FromBody] Guid id)
		{
			try
			{
				_ownerRequestFacade.Decline(id);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}
	}
}
