using System;
using System.Collections.Generic;
using AutoMapper;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums;
using FoodDelivery.Utilities.Managers;
using Microsoft.AspNetCore.Identity;

namespace FoodDelivery.BusinessLogic.Facades
{
	public class OwnerRequestFacade : IOwnerRequestFacade
	{
		private readonly IOwnerRequestRepository _ownerRequestRepository;
		private readonly UserManager<IdentityUser> _userManager;
		private readonly IMapper _mapper;
		private readonly IEmailManager _emailManager;

		public OwnerRequestFacade(IOwnerRequestRepository ownerRequestRepository,
			UserManager<IdentityUser> userManager,
			IMapper mapper,
			IEmailManager emailManager)
		{
			_ownerRequestRepository = ownerRequestRepository;
			_userManager = userManager;
			_mapper = mapper;
			_emailManager = emailManager;
		}

		public ICollection<OwnerRequestDTO> Get()
		{
			return _ownerRequestRepository.Get();
		}
		public ICollection<OwnerRequestDTO> GetByStatus(RoleRequestStatus requestStatus)
		{
			return _ownerRequestRepository.GetByStatus((int)requestStatus);
		}

		public void Create(Guid userProfileId)
		{
			OwnerRequestDTO requestDTO = new OwnerRequestDTO()
			{
				UserProfileId = userProfileId,
				Status = (int)RoleRequestStatus.Awaiting,
				CreatedDate = DateTime.Now
			};

			_ownerRequestRepository.Create(requestDTO);
		}

		//Not id because need info about user
		public void Approve(OwnerRequestDTO requestDTO)
		{
			OwnerRequest request = _ownerRequestRepository.GetById(requestDTO.Id);

			if (request == null)
			{
				throw new Exception("no such user");
			}

			request.Status = (int)RoleRequestStatus.Approved;
			request.ClosedDate = DateTime.Now;

			_ownerRequestRepository.Update(request);

			IdentityUser user = _userManager.FindByIdAsync(request.UserProfile.AspNetUserId).Result;
			var result = _userManager.AddToRoleAsync(user, "owner").Result;

			if (result.Succeeded)
			{
				_emailManager.SendRoleRequestStatusChangedAsync(request.UserProfile.Email, RoleRequestStatus.Approved);
			}
			else
			{
				throw new Exception(result.Errors.ToString());
			}
		}

		public void Deny(OwnerRequestDTO requestDTO)
		{
			OwnerRequest request = _ownerRequestRepository.GetById(requestDTO.Id);

			if (request == null)
			{
				throw new Exception("no such user");
			}

			request.Status = (int)RoleRequestStatus.Denied;
			request.ClosedDate = DateTime.Now;

			_ownerRequestRepository.Update(request);

			_emailManager.SendRoleRequestStatusChangedAsync(request.UserProfile.Email, RoleRequestStatus.Denied);
		}
	}
}
