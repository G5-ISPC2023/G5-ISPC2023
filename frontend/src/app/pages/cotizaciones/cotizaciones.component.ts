import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CotizacionesService } from 'src/app/services/cotizaciones.service';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent {
  title: string='Cotizaciones'
  image: string="https://cdn.icon-icons.com/icons2/4029/PNG/512/twitter_x_new_logo_x_rounded_icon_256078.png"
  listCotizaciones: Array<any> = []

  constructor(private cotizacionesService:CotizacionesService, private route: Router){

  }

  ngOnInit(): void{
    this.refrescar_cotizacion();
  }

  refrescar_cotizacion(){
    this.cotizacionesService.getCotizaciones().subscribe({
      next:( listCotizaciones:Array<any>) => {
        this.listCotizaciones = listCotizaciones.filter(ob=>ob.puntas !== null);
        console.log(this.listCotizaciones)
      },
      error: error => {
        console.log("Error al llamar la API: ", error)
      },
      complete: () => {
        console.info("Llamado a la API completa.")
      }
    })
  }
  navigate(url:string){
    this.route.navigate([url])
  }
}
