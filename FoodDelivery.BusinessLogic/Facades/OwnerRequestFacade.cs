using System;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;
using FoodDelivery.Utilities.Managers;
using Microsoft.AspNetCore.Identity;

namespace FoodDelivery.BusinessLogic.Facades
{
	public class OwnerRequestFacade : IOwnerRequestFacade
	{
		private readonly IOwnerRequestRepository _ownerRequestRepository;
		private readonly UserManager<IdentityUser> _userManager;
		private readonly IEmailManager _emailManager;

		public OwnerRequestFacade(IOwnerRequestRepository ownerRequestRepository,
			UserManager<IdentityUser> userManager,
			IEmailManager emailManager)
		{
			_ownerRequestRepository = ownerRequestRepository;
			_userManager = userManager;
			_emailManager = emailManager;
		}

		public OwnerRequestResponseDTO Retrieve(OwnerRequestFilterParams filterParam)
		{
			return _ownerRequestRepository.Retrieve(filterParam);
		}

		public void Create(Guid userProfileId)
		{
			_ownerRequestRepository.Create(userProfileId);
		}

		public void Approve(Guid id)
		{
			OwnerRequest request = _ownerRequestRepository.GetById(id);

			if (request == null)
			{
				throw new Exception("no such request");
			}

			_ownerRequestRepository.Update(request, OwnerRequestStatus.Approved);

			IdentityUser user = _userManager.FindByIdAsync(request.UserProfile.AspNetUserId).Result;
			var result = _userManager.AddToRoleAsync(user, "owner").Result;

			if (result.Succeeded)
			{
				_emailManager.SendOwnerRequestStatusChangedAsync(request.UserProfile.Email, OwnerRequestStatus.Approved);
			}
			else
			{
				throw new Exception(result.Errors.ToString());
			}
		}

		public void Decline(Guid id)
		{
			OwnerRequest request = _ownerRequestRepository.GetById(id);

			if (request == null)
			{
				throw new Exception("no such user");
			}

			_ownerRequestRepository.Update(request, OwnerRequestStatus.Declined);

			IdentityUser user = _userManager.FindByIdAsync(request.UserProfile.AspNetUserId).Result;
			var result = _userManager.RemoveFromRoleAsync(user, "owner").Result;

			if (result.Succeeded)
			{
				_emailManager.SendOwnerRequestStatusChangedAsync(request.UserProfile.Email, OwnerRequestStatus.Declined);
			}
			else
			{
				throw new Exception(result.Errors.ToString());
			}
		}

		public OwnerRequestStatus? GetStatus(Guid id)
		{
			return _ownerRequestRepository.GetStatus(id);
		}
	}
}
