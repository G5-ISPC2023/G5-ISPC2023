using API_ARGBroker.Models;

namespace API_ARGBroker.Services
{
    public interface AccionesService
    {
        Task<IEnumerable<Accione>> GetAcciones();
        Task<Accione> GetAccion(int id);
        Task<bool> ComprarAccion(int accionId, int cantidad, int usuarioId);
        Task<IEnumerable<AccionesComprada>> GetAccionesCompradasPorUsuario(int usuarioId);
    }
}
