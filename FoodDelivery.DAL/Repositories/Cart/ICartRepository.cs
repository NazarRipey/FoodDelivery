using System;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;

namespace FoodDelivery.DAL.Repositories
{
	public interface ICartRepository
	{
		Cart GetByUserProfileId(Guid userProfileId);
		void Add(Guid userProfileId);
		CartResponseDTO Get(Guid userId);
		void Remove(Guid userId);
		int GetTotalItems(Guid userId);
	}
}
