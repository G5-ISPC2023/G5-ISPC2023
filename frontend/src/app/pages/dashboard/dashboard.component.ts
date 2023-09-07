import { Component } from '@angular/core';
import { CotizacionesService } from '../../services/cotizaciones.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  title: string = 'ARGBroker | Dashboard'
  listCotizaciones: any = []

  constructor(private CotizacionesService:CotizacionesService){

  }

  ngOnInit(): void{
    this.refrescarCotizaciones()
  }

  refrescarCotizaciones(){
    this.CotizacionesService.getCotizaciones().subscribe({
      next: listCotizaciones => {
        this.listCotizaciones = listCotizaciones
      },
      error: error => {
        console.log("Error en llamar a la API: ", error)
      },
      complete: () => {

      }
    })
  }
}
