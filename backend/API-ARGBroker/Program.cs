using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using API_ARGBroker.Models;
using System.Text.Json.Serialization;
using API_ARGBroker.Services.Imp;
using API_ARGBroker.Services;
using API_ARGBroker.Services.Implementacion;

var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.

    builder.Services.AddControllers();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ArgbrokerContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("cadenaSQL")));
builder.Services.AddCors();
builder.Services.AddScoped<UsuarioService, UsuarioServiceImp>();
builder.Services.AddScoped<AccionesService, AccionesServiceImp>();
builder.Services.AddControllers().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

    var app = builder.Build();

app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
});


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
