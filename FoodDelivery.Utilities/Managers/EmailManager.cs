using System.Threading.Tasks;
using FoodDelivery.Entities.Enums.Status;
using MailKit.Net.Smtp;
using MimeKit;

namespace FoodDelivery.Utilities.Managers
{
	public class EmailManager : IEmailManager
	{
		public async Task SendConfirmationCodeAsync(string email, int code)
		{
			string subject = "Email confirmation";
			string message = "Confirmation code: " + code;
			await SendMessage(email, subject, message);
		}

		public async Task SendOrderCompletedAsync(string email, int orderNumber)
		{
			string subject = "Order completed";
			string message = $"Your order №{orderNumber} has been completed.";

			await SendMessage(email, subject, message);
		}

		public async Task SendOwnerRequestStatusChangedAsync(string email, OwnerRequestStatus ownerRequestStatus)
		{
			string subject = "Owner request status changed";
			string message = "";

			switch (ownerRequestStatus)
			{
				case OwnerRequestStatus.Approved:
					message = "Congratulations, your owner request status has been approved";
					break;
				case OwnerRequestStatus.Declined:
					message = "Your owner request status has been declined, contact our administrator at admin@mailinator.com for details.";
					break;
			}

			await SendMessage(email, subject, message);
		}

		public async Task SendPasswordAsync(string email, string password)
		{
			string subject = "Confidential!";
			string message = $"Your password: {password}";

			await SendMessage(email, subject, message);
		}

		public async Task SendRestaurantRequestStatusChangedAsync(string email,
			string restaurantName, RestaurantRequestStatus restaurantRequestStatus)
		{
			string subject = "RestaurantRequest request status changed";
			string message = "";

			switch (restaurantRequestStatus)
			{
				case RestaurantRequestStatus.Approved:
					message = $"Congratulations, restaurant request status for {restaurantName} has been approved.";
					break;
				case RestaurantRequestStatus.Declined:
					message = $"Restaurant request status for {restaurantName} has been declined," +
						$" contact our administrator at admin@mailinator.com for details.";
					break;
			}

			await SendMessage(email, subject, message);
		}

		private async Task SendMessage(string email, string subject, string message)
		{
			var emailMessage = new MimeMessage();

			emailMessage.From.Add(new MailboxAddress("Food Delivery", "nrfooddelivery@gmail.com"));
			emailMessage.To.Add(new MailboxAddress("", email));
			emailMessage.Subject = subject;
			emailMessage.Body = new TextPart()
			{
				Text = message
			};

			using (var client = new SmtpClient())
			{
				await client.ConnectAsync("smtp.gmail.com", 465, true);
				await client.AuthenticateAsync("nrfooddelivery@gmail.com", "fooddelivery01");
				await client.SendAsync(emailMessage);
				await client.DisconnectAsync(true);
			}
		}
	}
}
