using System;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;

namespace FoodDelivery.DAL.Repositories
{
	public class BaseRepository : IDisposable
	{
		protected FoodDeliveryDbContext _db;
		protected IMapper _mapper;

		public BaseRepository(FoodDeliveryDbContext db, IMapper mapper)
		{
			_db = db;
			_mapper = mapper;
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
