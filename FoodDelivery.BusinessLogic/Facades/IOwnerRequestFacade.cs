using System;
using System.Collections.Generic;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums;

namespace FoodDelivery.BusinessLogic.Facades
{
	public interface IOwnerRequestFacade
	{
		ICollection<OwnerRequestDTO> Get();
		ICollection<OwnerRequestDTO> GetByStatus(RoleRequestStatus requestStatus);
		void Create(Guid userProfileId);
		void Approve(OwnerRequestDTO requestDTO);
		void Deny(OwnerRequestDTO requestDTO);
	}
}
