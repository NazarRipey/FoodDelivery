using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Helpers;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Utilities.Managers;
using FoodDelivery.Utilities.Mappers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace FoodDelivery.API
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddDbContext<FoodDeliveryDbContext>(options =>
				options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

			services.AddAuthentication().AddCookie();
			services.AddCors();

			services.AddIdentity<IdentityUser, IdentityRole>(opt =>
			{
				opt.Password.RequireDigit = true;
				opt.Password.RequireLowercase = true;
				opt.Password.RequireUppercase = true;
				opt.Password.RequireNonAlphanumeric = false;
				opt.Password.RequiredLength = 8;
			}).AddEntityFrameworkStores<FoodDeliveryDbContext>()
				.AddDefaultTokenProviders();

			/*services.ConfigureApplicationCookie(c =>
			{
				c.Cookie.Name = "Identity.Cookie";

			});*/

			services.AddAutoMapper(typeof(MappingProfile));
			services.AddScoped<IUserProfileRepository, UserProfileRepository>();
			services.AddScoped<IUserProfileFacade, UserProfileFacade>();
			services.AddScoped<IEmailManager, EmailManager>();

			services.AddControllers();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env,
			UserManager<IdentityUser> userManager,
			IUserProfileRepository userProfileRepository)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseCors(builder =>
			{
				builder
				.AllowAnyMethod()
				.AllowAnyHeader()
				.SetIsOriginAllowed(origin => true)
				.AllowCredentials();
			});

			app.UseAuthentication();
			app.UseAuthorization();

			IdentityDataInitializer.AddAdminAsync(userManager, userProfileRepository);

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}
