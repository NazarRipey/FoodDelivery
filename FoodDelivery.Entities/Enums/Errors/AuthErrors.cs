namespace FoodDelivery.Entities.Enums
{
	public enum AuthErrors
	{
		AlreadyExistsEmail = 1,

		AlreadyExistsPhone,

		WrongEmailPassword,

		EmailNotConfirmed,

		ModelInvalid,

		WrongConfirmationCode,

		CannotSignIn,
	}
}
