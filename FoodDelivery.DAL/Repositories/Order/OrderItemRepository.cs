using AutoMapper;
using FoodDelivery.DAL.EF.Context;

namespace FoodDelivery.DAL.Repositories
{
	public class OrderItemRepository : BaseRepository, IOrderItemRepository
	{
		public OrderItemRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }
	}
}
