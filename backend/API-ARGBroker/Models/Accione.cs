using System;
using System.Collections.Generic;

namespace API_ARGBroker.Models;

public partial class Accione
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public decimal Precio { get; set; }

    public int? Cantidad { get; set; }

    public decimal? VariacionDiaria { get; set; }

    public decimal? Apertura { get; set; }

    public decimal? Minimo { get; set; }

    public decimal? Maximo { get; set; }

    public decimal? UltimoCierre { get; set; }

    public virtual ICollection<AccionesComprada> AccionesComprada { get; set; } = new List<AccionesComprada>();
}
