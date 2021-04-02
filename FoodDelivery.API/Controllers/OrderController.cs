using System;
using System.Collections.Generic;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.Entities.DTO.Order;
using FoodDelivery.Entities.FilterParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FoodDelivery.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class OrderController : ControllerBase
	{
		private readonly IOrderFacade _orderFacade;
		private readonly IUserProfileFacade _userProfileFacade;

		public OrderController(IOrderFacade orderFacade, IUserProfileFacade userProfileFacade)
		{
			_orderFacade = orderFacade;
			_userProfileFacade = userProfileFacade;
		}

		[HttpGet]
		[Route("active")]
		public ICollection<OrderShortDTO> GetActive()
		{
			Guid userId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;

			return _orderFacade.GetActive(userId);
		}

		[HttpPost]
		[Route("all")]
		public OrderResponseDTO RetrieveAll(OrderFilterParams orderFilterParams)
		{
			Guid userId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;

			return _orderFacade.RetrieveAll(orderFilterParams, userId);
		}

		[HttpPost]
		[Route("add")]
		public IActionResult Post([FromBody] AddOrderDTO addOrderDTO)
		{
			try
			{
				_orderFacade.AddOrder(addOrderDTO);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}
		/*
		// GET: api/<OrderController>
		[HttpGet]
		public IEnumerable<string> Get()
		{
			return new string[] { "value1", "value2" };
		}

		// GET api/<OrderController>/5
		[HttpGet("{id}")]
		public string Get(int id)
		{
			return "value";
		}


		// PUT api/<OrderController>/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody] string value)
		{
		}

		// DELETE api/<OrderController>/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}*/
	}
}
