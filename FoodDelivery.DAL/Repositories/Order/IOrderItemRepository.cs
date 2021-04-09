using System;

namespace FoodDelivery.DAL.Repositories
{
	public interface IOrderItemRepository
	{
		void Update(Guid id, int quantity);
		void Remove(Guid id);
	}
}
