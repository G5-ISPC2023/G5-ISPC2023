import { Component } from '@angular/core';
import { CotizacionesService } from '../../services/cotizaciones.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  title: string = 'ARGBroker | Dashboard';
  accionesAgrupadas: any[] = [];
  usuarioId: number | null = 0;
  inversionTotal: number = 0;

  constructor(private authService: AuthService, private CotizacionesService: CotizacionesService) {}

  ngOnInit(): void {
    this.usuarioId = this.authService.getUsuarioId();
    this.refrescarCotizaciones();

  }

  refrescarCotizaciones() {
    this.inversionTotal = 0;
    this.CotizacionesService.getCotizacionesUsuario(this.usuarioId).subscribe({
      next: (listCotizaciones) => {
        this.accionesAgrupadas = listCotizaciones;

        this.accionesAgrupadas.forEach((accion: any) => {
          const accionesCompradas = accion.accionesCompradas;
          if (accionesCompradas) {
            accion.cantidadTotal = accionesCompradas.reduce((total: number, compra: any) => {
              return total + compra.cantidad;
            }, 0);

            const inversionAccion = accion.precio * accion.cantidadTotal;
            this.inversionTotal += inversionAccion;
          }
        });

        console.log(listCotizaciones);
        console.log('Inversión Total: ' + this.inversionTotal);
      },
      error: (error) => {
        console.log('Error en llamar a la API: ', error);
      },
    });
  }

}
