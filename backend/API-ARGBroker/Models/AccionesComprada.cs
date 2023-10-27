using System;
using System.Collections.Generic;

namespace API_ARGBroker.Models;

public partial class AccionesComprada
{
    public int Id { get; set; }

    public int? UsuarioId { get; set; }

    public int? AccionId { get; set; }

    public int? Cantidad { get; set; }

    public DateTime? FechaCompra { get; set; }

    public virtual Accione? Accion { get; set; }

    public virtual Usuario? Usuario { get; set; }
}
