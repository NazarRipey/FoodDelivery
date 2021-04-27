using System;
using System.IO;

namespace FoodDelivery.Utilities.Helpers
{
	public static class FileHelper
	{
		public static readonly string dishPath = @"Resources\Images\Dishes\";
		public static readonly string restaurantPath = @"Resources\Images\Restaurants\";
		public static readonly string profilePath = @"Resources\Images\UserProfiles\";
		public static readonly string placeholderPath = @"Resources\Images\placeholder.jpg";

		private static string GetBase64Image(string path)
		{
			byte[] imageArray;
			if (File.Exists(path))
			{
				imageArray = File.ReadAllBytes(path);
			}
			else
			{
				imageArray = File.ReadAllBytes(placeholderPath);
			}

			string base64Img = "data:image/jpg;base64," + Convert.ToBase64String(imageArray);
			return base64Img;
		}

		private static void SaveImage(string image, string name)
		{
			byte[] fileContents = Convert.FromBase64String(Base64Helper.ExtractFromDataUri(image));

			File.WriteAllBytes(name, fileContents);
		}

		private static void DeleteImage(string path)
		{
			if (File.Exists(path))
			{
				File.Delete(path);
			}
		}

		public static string GetRestaurantImage(string fileName)
		{
			return GetBase64Image(restaurantPath + fileName + ".jpg");
		}
		public static string GetDishImage(string fileName)
		{
			return GetBase64Image(dishPath + fileName + ".jpg");
		}

		public static string GetUserProfileImage(string fileName)
		{
			return GetBase64Image(profilePath + fileName + ".jpg");
		}

		public static void SaveDishImage(string image, string name)
		{
			SaveImage(image, dishPath + name + ".jpg");
		}

		public static void SaveRestaurantImage(string image, string name)
		{
			SaveImage(image, restaurantPath + name + ".jpg");
		}

		public static void SaveUserProfileImage(string image, string name)
		{
			SaveImage(image, profilePath + name + ".jpg");
		}

		public static void DeleteDishImage(string path)
		{
			DeleteImage(dishPath + path + ".jpg");
		}

		public static void DeleteRestaurantImage(string path)
		{
			DeleteImage(restaurantPath + path + ".jpg");
		}

		public static void DeleteProfileImage(string path)
		{
			DeleteImage(profilePath + path + ".jpg");
		}
	}
}
