using System.Threading.Tasks;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Helpers;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Utilities.Managers;
using FoodDelivery.Utilities.Mappers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
				options.UseLazyLoadingProxies()
				.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

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
				.AddDefaultTokenProviders()
				.AddRoles<IdentityRole>();

			//Is this okay?
			services.ConfigureApplicationCookie(options =>
			{
				options.Events.OnRedirectToLogin = context =>
				{
					if (context.Request.Path.Value.StartsWith("/api"))
					{
						context.Response.Clear();
						context.Response.StatusCode = 401;
						return Task.FromResult(0);
					}
					context.Response.Redirect(context.RedirectUri);
					return Task.FromResult(0);
				};

				options.Events.OnRedirectToAccessDenied = context =>
				{
					if (context.Request.Path.Value.StartsWith("/api"))
					{
						context.Response.Clear();
						context.Response.StatusCode = 403;
						return Task.FromResult(0);
					}
					context.Response.Redirect(context.RedirectUri);
					return Task.FromResult(0);
				};
			});

			services.AddAutoMapper(typeof(MappingProfile));
			services.AddScoped<IEmailManager, EmailManager>();

			services.AddScoped<IUserProfileRepository, UserProfileRepository>();
			services.AddScoped<IUserProfileFacade, UserProfileFacade>();

			services.AddScoped<IOwnerRequestRepository, OwnerRequestRepository>();
			services.AddScoped<IOwnerRequestFacade, OwnerRequestFacade>();

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
