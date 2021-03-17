using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.Repositories
{
	public class OwnerRequestRepository : BaseRepository, IOwnerRequestRepository
	{
		public OwnerRequestRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public ICollection<OwnerRequestDTO> Get()
		{
			ICollection<OwnerRequestDTO> requestDTOs =
				_mapper.Map<ICollection<OwnerRequestDTO>>(_db.OwnerRequest.Include(r => r.UserProfile));

			return requestDTOs;
		}

		public ICollection<OwnerRequestDTO> GetByStatus(int status)
		{
			IEnumerable<OwnerRequest> requests = _db.OwnerRequest
				.Where(r => r.Status == status)
				.Include(r => r.UserProfile);
			ICollection<OwnerRequestDTO> requestDTOs = _mapper.Map<ICollection<OwnerRequestDTO>>(requests);

			return requestDTOs;
		}

		public void Create(OwnerRequestDTO requestDTO)
		{
			OwnerRequest request = _mapper.Map<OwnerRequest>(requestDTO);
			_db.OwnerRequest.Add(request);
			SaveChanges();
		}

		public void Update(OwnerRequest request)
		{
			_db.Entry(request).State = EntityState.Modified;
			SaveChanges();
		}

		public OwnerRequest GetById(Guid id)
		{
			OwnerRequest ownerRequest = _db.OwnerRequest.Where(or => or.Id == id).SingleOrDefault();
			return ownerRequest;
		}
	}
}
