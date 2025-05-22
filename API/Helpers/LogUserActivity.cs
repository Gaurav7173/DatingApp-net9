using System;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers;

public class LogUserActivity : IAsyncResultFilter
{
    public async Task OnResultExecutionAsync(ResultExecutingContext context, ResultExecutionDelegate next)
    {
        var resultContext=await next();

        if(context.HttpContext.User.Identity?.IsAuthenticated!=true) return;
        var userId=resultContext.HttpContext.User.GetUserId();
        var repo=resultContext.HttpContext.RequestServices.GetRequiredService<IUserRepository>();
        var user=await repo.GetUserByIdAsync(userId);
        if(user==null) return;
        user.LastActive = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
        await repo.SaveAllAsync();

    }
}
