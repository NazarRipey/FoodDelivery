using System;
using System.Collections.Generic;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums;
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
		public IEnumerable<OwnerRequestDTO> Get(string status)
		{
			if (status != null)
			{
				if (Enum.TryParse(status, out RoleRequestStatus roleStatus))
				{
					return _ownerRequestFacade.GetByStatus(roleStatus);
				}
			}
			return _ownerRequestFacade.Get();
		}


		// POST api/<RequestController>
		[HttpPost]
		[Route("approve")]
		public IActionResult Approve([FromBody] OwnerRequestDTO requestDTO)
		{
			try
			{
				_ownerRequestFacade.Approve(requestDTO);
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}

			return Ok();
		}

		[HttpPost]
		[Route("deny")]
		public IActionResult Deny([FromBody] OwnerRequestDTO requestDTO)
		{
			try
			{
				_ownerRequestFacade.Deny(requestDTO);
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}

			return Ok();
		}

		/*
		// PUT api/<RequestController>/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody] string value)
		{
		}

		// DELETE api/<RequestController>/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
		*/
	}
}
