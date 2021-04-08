using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodDelivery.DAL.EF.Entities
{
	public class Order
	{
		[Key]
		public Guid Id { get; set; }
		public int OrderNumber { get; set; }
		[ForeignKey("UserProfile")]
		public Guid UserProfileId { get; set; }
		[ForeignKey("Manager")]
		public Guid? ManagerId { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime? ClosedDate { get; set; }
		public string ContactPhoneNumber { get; set; }
		public int PaymentType { get; set; }
		public string Address { get; set; }
		public int Status { get; set; }
		public decimal TotalSum { get; set; }
		public string Comment { get; set; }
		public virtual UserProfile UserProfile { get; set; }
		public virtual UserProfile Manager { get; set; }
		public virtual List<OrderItem> OrderItems { get; set; }
	}
}
