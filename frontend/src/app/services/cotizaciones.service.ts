import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizacionesService {

  url: string="https://localhost:7098/api/acciones"

  constructor(private http:HttpClient) { }

  getCotizaciones():Observable<any>
  {
    return this.http.get(this.url)
  }
  getCotizacionesUsuario(usuarioId: number | null): Observable<any> {
    return this.http.get(`${this.url}/accionescompradas/${usuarioId}`);
  }

  comprarAccion(compraData: any) {
    return this.http.post(`${this.url}/comprar`, compraData);
  }
}
