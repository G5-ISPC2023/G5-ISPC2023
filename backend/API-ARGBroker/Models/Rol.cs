using System;
using System.Collections.Generic;

namespace API_ARGBroker.Models;

public partial class Rol
{
    public int Id { get; set; }

    public string Titulo { get; set; } = null!;

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
