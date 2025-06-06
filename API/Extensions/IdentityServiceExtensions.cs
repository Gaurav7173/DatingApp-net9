using System;
using System.Text;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions;

public static class IdentityServiceExtensions
{
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {

        services.AddIdentityCore<AppUser>(opt =>
        {
            opt.Password.RequireNonAlphanumeric = false;

        })
        .AddRoles<AppRole>()
        .AddRoleManager<RoleManager<AppRole>>()
        .AddEntityFrameworkStores<DataContext>();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
         .AddJwtBearer(Options =>
 {
     var tokenkey = config["TokenKey"] ?? throw new Exception("TokenKey not found");
     Options.TokenValidationParameters = new TokenValidationParameters
     {
         ValidateIssuerSigningKey = true,
         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenkey)),
         ValidateIssuer = false,
         ValidateAudience = false
     };
     Options.Events = new JwtBearerEvents
     {
         OnMessageReceived = context =>
         {
             var accessToken = context.Request.Query["access_token"];
             var path = context.HttpContext.Request.Path;
             if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
             {
                 context.Token = accessToken;
             }
             return Task.CompletedTask;
         }
     };

 });
        services.AddAuthorizationBuilder()
        .AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"))
        .AddPolicy("ModeratePhotoRole", policy => policy.RequireRole("Admin", "Moderator"));


       

return services;

    }

}
