using System.Threading.Tasks;
using FoodDelivery.Entities.Enums;
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

		public async Task SendRoleRequestStatusChangedAsync(string email, RoleRequestStatus roleRequestStatus)
		{
			string subject = "Request status changed";
			string message = "";

			switch (roleRequestStatus)
			{
				case RoleRequestStatus.Approved:
					message = "Congratulations, admin has APPROVED you owner status. " +
						"You can add restaurants and dishes now";
					break;
				case RoleRequestStatus.Denied:
					message = "Unfortunately, admin has DENIED you owner status.";
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
