using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_ARGBroker.Models;
using API_ARGBroker.Services;
using API_ARGBroker.Utilities;
using System.Security.Claims;
using API_ARGBroker.Dto;

namespace API_ARGBroker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccionesController : ControllerBase
    {
        private readonly AccionesService _context;

        public AccionesController(AccionesService context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAcciones()
        {
            try
            {
                var acciones = await _context.GetAcciones();
                return Ok(acciones);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Resultado = "error", Mensaje = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccion(int id)
        {
            try
            {
                var accion = await _context.GetAccion(id);
                if (accion == null)
                {
                    return NotFound(new { Resultado = "error", Mensaje = "Acción no encontrada" });
                }
                return Ok(accion);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Resultado = "error", Mensaje = ex.Message });
            }
        }

        [HttpGet("accionescompradas/{usuarioId}")]
        public async Task<IActionResult> AccionesCompradasPorUsuario(int usuarioId)
        {
            try
            {
                var accionesCompradas = await _context.GetAccionesCompradasPorUsuario(usuarioId);

                var accionesAgrupadas = new List<Dictionary<string, object>>();

                foreach (var compra in accionesCompradas)
                {
                    var existingAccion = accionesAgrupadas.FirstOrDefault(a => (int)a["id"] == compra.AccionId);

                    if (existingAccion == null)
                    {
                        var nuevaAccion = new Dictionary<string, object>
                {
                    { "id", compra.AccionId },
                    { "nombre", compra.Accion.Nombre },
                    { "precio", compra.Accion.Precio },
                    // Agregar otras propiedades de la acción que desees incluir.
                    { "accionesCompradas", new List<object>() }
                };

                        ((List<object>)nuevaAccion["accionesCompradas"]).Add(new Dictionary<string, object>
                {
                    { "id", compra.Id },
                    { "usuarioId", compra.UsuarioId },
                    { "accionId", compra.AccionId },
                    { "cantidad", compra.Cantidad },
                    { "fechaCompra", compra.FechaCompra }
                });

                        accionesAgrupadas.Add(nuevaAccion);
                    }
                    else
                    {
                        ((List<object>)existingAccion["accionesCompradas"]).Add(new Dictionary<string, object>
                {
                    { "id", compra.Id },
                    { "usuarioId", compra.UsuarioId },
                    { "accionId", compra.AccionId },
                    { "cantidad", compra.Cantidad },
                    { "fechaCompra", compra.FechaCompra }
                });
                    }
                }

                return Ok(accionesAgrupadas);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Resultado = "error", Mensaje = ex.Message });
            }
        }

        [HttpPost("comprar")]
        public async Task<IActionResult> ComprarAccion([FromBody] AccionCompraDto accionCompra)
        {
            try
            {
                bool resultado = await _context.ComprarAccion(accionCompra.accionId, accionCompra.cantidad, accionCompra.usuarioId);
                if (resultado)
                {
                    return Ok(new { Resultado = "ok", Mensaje = "Acción comprada con éxito" });
                }
                return BadRequest(new { Resultado = "error", Mensaje = "No se pudo comprar la acción" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Resultado = "error", Mensaje = ex.Message });
            }
        }
    }
}
