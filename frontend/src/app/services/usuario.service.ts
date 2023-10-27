import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url: string = "https://localhost:7098/api/Usuario";
  constructor(private http: HttpClient) { }

  getUsuarioInfo(usuarioId: number) {
    return this.http.get<any>(`${this.url}/${usuarioId}`);
  }
}
