import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = "https://reqres.in/api/login"
  userLogged: BehaviorSubject <boolean> = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient) {
    const isUserLogged = sessionStorage.getItem('isUserLogged')
    if(isUserLogged === 'true'){
      this.userLogged.next(true)
    }
   }

  login(loginRequest:any):Observable<any>{
    return this.http.post(this.url, loginRequest).pipe(
      tap((token) => {
        if(JSON.stringify(token).length != 0){
          this.userLogged.next(true)
          sessionStorage.setItem('isUserLogged', 'true')
        }
      }),
      catchError(this.handleError)
    )
  }

  register(registerRequest:any): Observable<any>{
    return this.http.post(this.url, registerRequest)
  }

  logout(){
    this.userLogged.next(false);
    sessionStorage.removeItem('isUserLogged')
  }

  get isUserLogin(): Observable<boolean>{
    return this.userLogged.asObservable()
  }

  private handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.error("Ocurrio un error: ", error.error)
    }else {
      console.error("Backend returned code: ", error.status)
    }

    return throwError(() => new Error("Hubo un error. Intente de nuevo o mas tarde"))
  }
}
