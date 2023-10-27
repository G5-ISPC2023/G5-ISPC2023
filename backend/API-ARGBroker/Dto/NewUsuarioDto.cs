namespace API_ARGBroker.Dto
{
    public class NewUsuarioDto
    {
        public string Nombre { get; set; } = null!;

        public string Apellido { get; set; } = null!;

        public string Email { get; set; } = null!;
        public string? Pais { get; set; }

        public string Dni { get; set; } = null!;

        public string? Telefono { get; set; }

        public int? RolId { get; set; }

        public int? Dinero { get; set; }
    }
}
