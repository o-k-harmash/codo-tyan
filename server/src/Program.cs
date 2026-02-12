using Markdig;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

builder.Services.AddOpenApi();
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var pipeline = new MarkdownPipelineBuilder()
    .UseAdvancedExtensions()
    .Build();
builder.Services.AddSingleton(pipeline);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = configuration.GetConnectionString("RedisConnection");
    options.InstanceName = "api:";
});

builder.Services.AddGitHubRawClient(configuration);
builder.Services.AddCustomIdentity(configuration);
builder.Services.AddGitHubAuth(configuration);
builder.Services.AddJwtAuth(configuration);

builder.Services.AddScoped<ITokenService, TokenService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
