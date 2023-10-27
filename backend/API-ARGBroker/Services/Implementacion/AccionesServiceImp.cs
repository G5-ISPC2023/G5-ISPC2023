using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API_ARGBroker.Models;

namespace API_ARGBroker.Services.Implementacion
{
    public class AccionesServiceImp : AccionesService
    {
        private readonly ArgbrokerContext _context;

        public AccionesServiceImp(ArgbrokerContext context)
        {
            _context = context;
        }
        public async Task<bool> ComprarAccion(int accionId, int cantidad, int usuarioId)
        {
            var accion = await _context.Acciones.FindAsync(accionId);
            if (accion == null || cantidad > accion.Cantidad)
            {
                return false;
            }

            var usuario = await _context.Usuarios.FindAsync(usuarioId);
            if (usuario == null || usuario.Dinero < (cantidad * accion.Precio))
            {
                return false;
            }

            decimal costoCompra = cantidad * accion.Precio;

            usuario.Dinero = usuario.Dinero - (int)costoCompra;

            var compra = new AccionesComprada
            {
                UsuarioId = usuarioId,
                AccionId = accionId,
                Cantidad = cantidad,
                FechaCompra = DateTime.Now
            };
            _context.AccionesCompradas.Add(compra);

            accion.Cantidad -= cantidad;

            await _context.SaveChangesAsync();

            return true;

        }

        public async Task<Accione> GetAccion(int id)
        {
            return await _context.Acciones.FindAsync(id);
        }

        public async Task<IEnumerable<Accione>> GetAcciones()
        {
            return await _context.Acciones.ToListAsync();
        }

        public async Task<IEnumerable<AccionesComprada>> GetAccionesCompradasPorUsuario(int usuarioId)
        {
            return await _context.AccionesCompradas
                .Where(ac => ac.UsuarioId == usuarioId)
                .Include(ac => ac.Accion) 
                .ToListAsync();
        }
    }
}
