using System.Text.RegularExpressions;

namespace FoodDelivery.Utilities.Helpers
{
	public static class Base64Helper
	{
		public static string ExtractFromDataUri(string data)
		{
			return Regex.Replace(data, @"^data:image\/[a-zA-Z]+;base64,", string.Empty);
		}
	}
}
