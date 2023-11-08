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
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _context;

        public UsuarioController(UsuarioService context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsuarios()
        {
            try
            {
                var usuarios = await _context.GetAllUsuarios();
                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return BadRequest ( new { Resultado = "error", Mensaje = "No se pudo traer a los usuarios"});
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUnUsuario(int id)
        {
            try
            {
                var usuario = await _context.GetUnUsuario(id);
                var usuarioDto = new UsuarioDto
                {
                    Nombre = usuario.Nombre,
                    Apellido = usuario.Apellido,
                    Email = usuario.Email,
                    Telefono = usuario.Telefono,
                    Dinero = usuario.Dinero,
                    RolId = usuario.RolId,
                    Pais = usuario.Pais,
                    Dni = usuario.Dni
                };
                return Ok(usuarioDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Resultado = "error", Mensaje = ex.Message });
            }
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Registrarse(Usuario newUsuario) {
            newUsuario.Contraseña = Utilities.Utilidades.EncriptarClave(newUsuario.Contraseña);

            Usuario usuario = await _context.PostNewUsuario(newUsuario);

            if (usuario.Id > 0)
            {
                return Ok(new { Resultado = "ok" });
            }
            return Ok(new { Resultado = "error", Mensaje = "No se pudo registrar el usuario" });
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> IniciarSesion([FromBody] LoginUsuarioDto loginUsuarioDto) {
            Usuario usuario = await _context.GetUsuario(loginUsuarioDto.Email, Utilidades.EncriptarClave(loginUsuarioDto.Contraseña));

            if (usuario == null)
            {
                return BadRequest(new { Resultado = "error", Mensaje = "No se ha encontrado un usuario con estas credenciales" });
            }

            if (usuario.Contraseña != Utilidades.EncriptarClave(loginUsuarioDto.Contraseña))
            {
                return BadRequest(new { Resultado = "error", Mensaje = "La contraseña es incorrecta" });
            }

            int usuarioId = usuario.Id;

            return Ok(new { Resultado = "ok", Mensaje = "Has iniciado sesion correctamente", usuarioId = usuarioId });
        }

        [HttpPut("{id}")]
       
        public async Task<IActionResult> ActualizarUsuario(int id, [FromBody] Usuario usuarioActualizado)
        {
            var usuarioExistente = await _context.GetUsuarioPorId(id);
            if(usuarioExistente == null)
            {
                return NotFound(new { Resultado = "error", Mensaje = "Usuario no encontrado" });
            }

            Usuario usuario = await _context.ActualizarUsuario(id, usuarioActualizado);

            if (usuario == null)
            {
                return Ok(new { Resultado = "error", Mensaje = "No se ha encontrado un usuario" });    
            }

            return Ok(new { Resultado = "ok", Mensaje = "Usuario actualizado con éxito" });

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarUsuario(int id)
        {
            var usuarioExistente = await _context.GetUsuarioPorId(id);
            if (usuarioExistente == null)
            {
                return NotFound(new { Resultado = "error", Mensaje = "Usuario no encontrado" });
            }


            var usuarioEliminado = await _context.EliminarUsuario(id);

            if (usuarioEliminado)
            {
                return Ok(new { Resultado = "ok", Mensaje = "Usuario eliminado con éxito" });
            }

            return BadRequest(new { Resultado = "error", Mensaje = "No se pudo eliminar el usuario" });


        }

    }
}
