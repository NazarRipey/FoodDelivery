using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;

namespace FoodDelivery.Utilities.Managers
{
	public class EmailManager : IEmailManager
	{
		public async Task SendConfirmationCodeAsync(string email, int code)
		{
			var emailMessage = new MimeMessage();

			emailMessage.From.Add(new MailboxAddress("Food Delivery", "nrfooddelivery@gmail.com"));
			emailMessage.To.Add(new MailboxAddress("", email));
			emailMessage.Subject = "Email confirmation";
			emailMessage.Body = new TextPart()
			{
				Text = "Confirmation code: " + code
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
