import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CotizacionesService } from 'src/app/services/cotizaciones.service';

@Component({
  selector: 'app-comprar-accion',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  listCotizaciones: any[] = [];
  comision: number = 1.5

  compraData: any = {
    accionId: null,
    cantidad: 0,
    costoDecomision: 0,
    usuarioId: this.authService.getUsuarioId(),
  };

  habilitado: boolean = false;
  reciboGenerado: boolean = false;
  compraExitosa: boolean = false;
  compraFallida: boolean = false;

  constructor(private cotizacionesService: CotizacionesService, private authService: AuthService) { }

  ngOnInit() {
    this.refrescar_cotizacion();
  }

  refrescar_cotizacion() {
    this.cotizacionesService.getCotizaciones().subscribe({
      next: (listCotizaciones: Array<any>) => {
        console.log('Cotizaciones', listCotizaciones);
        this.listCotizaciones = listCotizaciones;
      },
      error: error => {
        console.error("Error al llamar la API: ", error);
      },
      complete: () => {
        console.info("Llamado a la API completo.");
      }
    });
  }
  cerrarModal(){
    this.compraExitosa = false;
    this.compraFallida = false;
    this.volver();
  }

  comprarAccion() {
    if (this.compraData.accionId && this.compraData.cantidad && this.compraData.usuarioId) {
      const compraData = {
        accionId: parseInt(this.compraData.accionId, 10),
        cantidad: this.compraData.cantidad,
        usuarioId: this.authService.getUsuarioId()
      };
      console.log("compraData:", compraData)
      this.cotizacionesService.comprarAccion(compraData).subscribe({
        next: (response: any) => {
          console.log('Compra exitosa:', response);
          this.reciboGenerado = false;
          this.compraExitosa = true;
        },
        error: (error) => {
          console.error('Error en la compra:', error);
          this.reciboGenerado = false;
          this.compraFallida = true;
        },
      });
    }
  }
  generarRecibo() {
    this.reciboGenerado = true;
    this.habilitado = true;
  }
  volver(){
    this.reciboGenerado = false;
    this.habilitado = false;
  }
  getPrecio(accionId: number): number {
    const accion = this.listCotizaciones.find(accion => accion.id == accionId);
    console.log(accion)
    return accion ? accion.precio : 0;
  }

  getCantidad(accionId: number): number {
    const accion = this.listCotizaciones.find(accion => accion.id == accionId);
    console.log(accion)
    return accion ? accion.cantidad : 0;
  }

  getNombreAccion(accionId: number): string {
    const accion = this.listCotizaciones.find(accion => accion.id == accionId);
    return accion ? accion.nombre : '';
  }

  calcularMaximo(accionId: number): number {
    const precio = this.getPrecio(accionId);
    return Math.floor(1000268 / precio);
  }

  calcularTotal(accionId:number): number {
    const accion = this.listCotizaciones.find(accion => accion.id == accionId);
    const precio = accion.precio;
    const totalSinComision = precio * this.compraData.cantidad;
    const comisionPorcentaje = 0.015;
    this.compraData.costoDecomision = (totalSinComision * comisionPorcentaje);
    const totalConComision = totalSinComision + this.compraData.costoDecomision;
    return totalConComision
  }


}
