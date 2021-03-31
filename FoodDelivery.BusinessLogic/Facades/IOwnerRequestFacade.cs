using System;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.BusinessLogic.Facades
{
	public interface IOwnerRequestFacade
	{
		OwnerRequestResponseDTO Retrieve(OwnerRequestFilterParams filterParam);
		void Create(Guid userProfileId);
		void Approve(Guid id);
		void Decline(Guid id);
		OwnerRequestStatus? GetStatus(Guid id);
	}
}
