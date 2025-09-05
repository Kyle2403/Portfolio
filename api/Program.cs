using fizzbuzz.Data;
using fizzbuzz.Interfaces;
using fizzbuzz.Services;
using Microsoft.EntityFrameworkCore;
using System;

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

// var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
// var dbPort = Environment.GetEnvironmentVariable("DB_PORT");
// var dbName = Environment.GetEnvironmentVariable("DB_NAME");
// var dbUser = Environment.GetEnvironmentVariable("DB_USER");
// var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");

// var connectionString = $"Host={dbHost};Port={dbPort};Database={dbName};Username={dbUser};Password={dbPassword}";
var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL") 
    ?? throw new Exception("DATABASE_URL not set");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));
// var connectionString = $"Server={dbHost},{dbPort};Database={dbName};User Id={dbUser};Password={dbPassword};TrustServerCertificate=True;";
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseSqlServer(connectionString)
// );
// builder.Services.AddDbContext<AppDbContext>(option =>
// {
//     option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
// });

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
