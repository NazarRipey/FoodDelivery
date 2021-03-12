using System;
using FoodDelivery.DAL.EF.Context;

namespace FoodDelivery.DAL.Repositories
{
	public class BaseRepository : IDisposable
	{
		protected FoodDeliveryDbContext _db;

		public BaseRepository(FoodDeliveryDbContext db)
		{
			_db = db;
		}
		public void SaveChanges()
		{
			_db.SaveChanges();
		}
		public void Dispose()
		{
			_db.Dispose();
		}
	}
}
