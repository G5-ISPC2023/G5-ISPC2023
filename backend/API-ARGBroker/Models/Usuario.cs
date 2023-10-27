using System;
using System.Collections.Generic;

namespace API_ARGBroker.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Contraseña { get; set; } = null!;

    public string? Pais { get; set; }

    public string Dni { get; set; } = null!;

    public string? Telefono { get; set; }

    public int? RolId { get; set; }

    public int? Dinero { get; set; }

    public virtual ICollection<AccionesComprada> AccionesComprada { get; set; } = new List<AccionesComprada>();

    public virtual Rol? Rol { get; set; }
}
