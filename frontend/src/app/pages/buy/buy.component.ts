import { PercentPipe } from '@angular/common';
import { Component} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CotizacionesService } from 'src/app/services/cotizaciones.service';


@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {

  listCotizaciones: Array<any> = [];

  total:number=0;

  formularioBuy = this.formBuilder.group ({
    tipo: [0],
    cantidad: [undefined,[Validators.pattern('0')]],
  });
  constructor (private formBuilder: FormBuilder,
    private cotizacionesService:CotizacionesService){}

ngOnInit(): void{
      this.refrescar_cotizacion();
    }

    mostrarRecibo = false;

    recibo() {
      this.mostrarRecibo = true;
      this.total=(this.formularioBuy.controls.tipo.value || 0) * (this.formularioBuy.controls.cantidad.value || 0)
    }
    volver() {

      this.mostrarRecibo = false;
    }
  refrescar_cotizacion(){
    this.cotizacionesService.getCotizaciones().subscribe({
      next: (listCotizaciones:Array<any>) => {
        console.log('BUY', listCotizaciones)
        this.listCotizaciones = listCotizaciones.filter(ob=>ob.ultimoPrecio);
      },
      error: error => {
        console.log("Error al llamar la API: ", error)
      },
      complete: () => {
        console.info("Llamado a la API completa.")
      }
    })
  }
}

