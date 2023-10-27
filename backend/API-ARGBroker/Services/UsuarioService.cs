using API_ARGBroker.Models;

namespace API_ARGBroker.Services
{
    public interface UsuarioService
    {
        Task<IEnumerable<Usuario>> GetAllUsuarios();
        Task<Usuario> GetUnUsuario(int id);

        Task<Usuario> GetUsuario(string email, string contraseña);
        Task<Usuario> PostNewUsuario(Usuario newUsuario);
        Task<Usuario> ActualizarUsuario(int id, Usuario usuarioActualizado);
        Task<bool> EliminarUsuario(int id);
        Task<Usuario> GetUsuarioPorId(int id);
    }
}
