using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.Repositories
{
	public class OwnerRequestRepository : BaseRepository, IOwnerRequestRepository
	{
		public OwnerRequestRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public OwnerRequestResponseDTO Retrieve(OwnerRequestFilterParams filterParam)
		{
			int totalItemsCount;

			IQueryable<OwnerRequest> ownerRequests = _db.OwnerRequest;

			if (filterParam.Search != null)
			{
				ownerRequests = ownerRequests
					.Where(o => (o.UserProfile.FirstName + o.UserProfile.LastName).Contains(filterParam.Search) ||
						o.UserProfile.Email.Contains(filterParam.Search));
			}
			if (filterParam.Status != null)
			{
				ownerRequests = ownerRequests.Where(o => o.Status == (int)filterParam.Status);
			}

			totalItemsCount = ownerRequests.Count();

			ICollection<OwnerRequest> requestsToReturn = ownerRequests
				.Skip(filterParam.ItemsPerPage * (filterParam.CurrentPage - 1))
				.Take(filterParam.ItemsPerPage)
				.ToList();

			ICollection<OwnerRequestDTO> requestDTOs = _mapper.Map<ICollection<OwnerRequestDTO>>(requestsToReturn);

			OwnerRequestResponseDTO ownerRequestResponseDTO = new OwnerRequestResponseDTO()
			{
				OwnerRequests = requestDTOs,
				TotalRequestsCount = totalItemsCount
			};

			return ownerRequestResponseDTO;
		}

		public void Create(Guid userId)
		{
			OwnerRequest request = new OwnerRequest()
			{
				UserProfileId = userId,
				CreatedDate = DateTime.Now,
				Status = (int)OwnerRequestStatus.Awaiting
			};
			_db.OwnerRequest.Add(request);

			SaveChanges();
		}

		public void Update(OwnerRequest request, OwnerRequestStatus ownerRequestStatus)
		{
			request.Status = (int)ownerRequestStatus;
			request.ClosedDate = DateTime.Now;

			_db.Entry(request).State = EntityState.Modified;

			SaveChanges();
		}

		public OwnerRequest GetById(Guid id)
		{
			OwnerRequest request = _db.OwnerRequest.Find(id);

			return request;
		}

		public OwnerRequestStatus? GetStatus(Guid id)
		{
			int? statusId = _db.OwnerRequest.Where(r => r.UserProfileId == id).SingleOrDefault()?.Status;

			if (statusId == null)
			{
				return null;
			}

			OwnerRequestStatus? status = (OwnerRequestStatus)statusId;
			return status;
		}
	}
}
