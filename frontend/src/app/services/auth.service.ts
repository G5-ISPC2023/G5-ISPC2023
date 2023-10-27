import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private usuarioId: number | null =null;
  url:string = "https://localhost:7098/api/Usuario/login"
  registro:string = "https://localhost:7098/api/Usuario/register"
  userLogged: BehaviorSubject <boolean> = new BehaviorSubject<boolean>(false)
  private usuarioInfoSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    const isUserLogged = sessionStorage.getItem('isUserLogged')
    if(isUserLogged === 'true'){
      this.userLogged.next(true)
    }
   }


   login(loginRequest: any): Observable<any> {

    return this.http.post(this.url, loginRequest).pipe(
      tap((response: any) => {
        this.setAuthenticated(true);
        this.userLogged.next(true);
        sessionStorage.setItem('isUserLogged', 'true');
        this.usuarioId = response.usuarioId;
        console.log(this.usuarioId)
      }),
      catchError(this.handleError)
    );
  }
  getUsuarioId(): number | null {
    return this.usuarioId;
  }

  getUserInfoSubject(): Observable<any> {
    return this.usuarioInfoSubject.asObservable();
  }

  setUserInfo(info: any) {
    this.usuarioInfoSubject.next(info);
  }

  register(registerRequest: any): Observable<any> {

    return this.http.post(this.registro, registerRequest).pipe(
      catchError(this.handleError)
    );
  }


  logout(){
    this.setAuthenticated(false);
  this.userLogged.next(false);
  sessionStorage.removeItem('isUserLogged');
  }

  get isUserLogin(): Observable<boolean>{
    return this.userLogged.asObservable()
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  private handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.error("Ocurrio un error: ", error.error)
    }else if(error.status === 400){
      console.error(error.error.mensaje)
    }
    else {
      console.error("Backend returned code: ", error.status)
    }

    return throwError(() => new Error(error.error.mensaje))
  }
}
