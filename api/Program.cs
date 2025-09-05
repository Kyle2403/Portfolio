using fizzbuzz.Data;
using fizzbuzz.Interfaces;
using fizzbuzz.Services;
using Microsoft.EntityFrameworkCore;
using System;
DotNetEnv.Env.Load();
var builder = WebApplication.CreateBuilder(args);
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowFrontend",
//         policy => policy
//             .WithOrigins("*") // React server URL
//             .AllowAnyHeader()
//             .AllowAnyMethod());
// });
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy
            .SetIsOriginAllowed(origin =>
            {
                if (string.IsNullOrWhiteSpace(origin)) return false;
                var uri = new Uri(origin);
                return uri.Host.EndsWith("kyle24.com");
            })
            .AllowAnyHeader()
            .AllowAnyMethod()
    );
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IAnswerService, AnswerService>();
builder.Services.AddScoped<ISessionService, SessionService>();
builder.Services.AddScoped<IPlayerService, PlayerService>();
builder.Services.AddScoped<IRuleService, RuleService>();
builder.Services.AddScoped<IGameService, GameService>();

string npgsqlConnectionString;

var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
if (!string.IsNullOrWhiteSpace(databaseUrl))
{
    // Render-managed PostgreSQL
    var uri = new Uri(databaseUrl);
    var userInfo = uri.UserInfo.Split(':');
    var username = userInfo[0];
    var password = userInfo[1];
    var host = uri.Host;
    var port = uri.Port > 0 ? uri.Port : 5432;
    var dbName = uri.AbsolutePath.TrimStart('/');

    npgsqlConnectionString = $"Host={host};Port={port};Database={dbName};Username={username};Password={password};SSL Mode=Require;Trust Server Certificate=true";
}
else
{
    // Local PostgreSQL
    var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "justdieman";
    npgsqlConnectionString = $"Host=localhost;Port=5433;Database=portfolio_db;Username=postgres;Password={dbPassword};SSL Mode=Disable";
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(npgsqlConnectionString));


// always add a initial create manually, push,  the update is applied here

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();  // Applies any pending migrations
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowFrontend");
app.MapControllers();

app.Run();
