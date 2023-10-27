using API_ARGBroker.Models;
using Microsoft.EntityFrameworkCore;
using API_ARGBroker.Services;

namespace API_ARGBroker.Services.Imp
{
    public class UsuarioServiceImp : UsuarioService
    {
        private readonly ArgbrokerContext _context;

        public UsuarioServiceImp(ArgbrokerContext context)
        {
            _context = context;
        }

        public async Task<Usuario> ActualizarUsuario(int id, Usuario usuarioActualizado)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if(usuario == null)
            {
                return null;
            }

            usuario.Nombre = usuarioActualizado.Nombre;
            usuario.Apellido = usuarioActualizado.Apellido;
            usuario.Email = usuarioActualizado.Email;
            usuario.Telefono = usuarioActualizado.Telefono;

            await _context.SaveChangesAsync();

            return usuario;
        }

        public async Task<bool> EliminarUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if(usuario == null)
            {
                return false;
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<Usuario>> GetAllUsuarios()
        {
            var UsuariosList = await _context.Usuarios.ToListAsync();
            return UsuariosList;
        }

        public async Task<Usuario> GetUsuario(string email, string contraseña)
        {
            Usuario usuario = await _context.Usuarios.Where(u => u.Email == email && u.Contraseña == contraseña).FirstOrDefaultAsync();

            return usuario;
        }

        public async Task<Usuario> PostNewUsuario(Usuario newUsuario)
        {
            _context.Usuarios.Add(newUsuario);
            await _context.SaveChangesAsync();
            return newUsuario;
        }
        public async Task<Usuario> GetUsuarioPorId(int id)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<Usuario> GetUnUsuario(int id)
        {
            return await _context.Usuarios.FindAsync(id);
        }
    }
}
