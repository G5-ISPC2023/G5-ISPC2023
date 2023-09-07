import { Component } from '@angular/core';
import { HEADER_ITEMS } from './header-items.constant';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  template: `
    <header>
      <nav class="navbar navbar-expand-lg p-0 m-0 border-bottom shadow-sm">
        <div class="container-fluid">
          <section
            class="d-flex flex-column align-content-center w-100 py-2 px-3 gap-2"
          >
            <div
              class="d-flex justify-content-between align-items-center gap-2"
            >
              <h1 class="navbar-brand text-primary fw-bolder m-0 p-0">
                <a class="text-decoration-none" href="/index.html"
                  >ARGBroken.com</a
                >
              </h1>
              <div class="d-flex align-items-center gap-2">
                <div class="d-flex gap-1" *ngIf="!loginOff">
                  <span class="fw-bold">Mariano Bazan</span>
                </div>
                <a
                  class="btn btn-sm"
                  *ngIf="loginOff"
                  routerLink="register"
                >
                  <i class="fa fa-sm fa-user-plus" aria-hidden="true"></i>
                  ABRIR CUENTA
                </a>
                <a class="btn btn-sm btn-primary"
                routerLink='login'
                (click)="logout()"
                >
                  <i class="fa fa-sm fa-lock" aria-hidden="true"></i>
                  {{ loginOff ? 'Ingresar' : 'Cerrar sesion' }}
                </a>
                <button
                  class="btn btn-sm collapsed d-lg-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbar"
                  aria-controls="navbar"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>
              </div>
            </div>
            <div class="collapse navbar-collapse" id="navbar">
              <ul class="navbar-nav d-flex justify-content-lg-end w-100 gap-3">
                <li class="nav-item">
                  <a class="nav-link p-0" routerLink="/">
                    Inicio
                  </a>
                </li>

                <li>
                <a class="nav-link p-0" routerLink="dashboard" *ngIf="!loginOff">
                    Dashboard
                  </a>
                </li>

                <li>
                <a class="nav-link p-0" routerLink="cotizaciones">
                    Cotizaciones
                  </a>

                </li>
                <li>
                  <a class="nav-link p-0" routerLink="about">
                    Quienes somos
                  </a>
                </li>
                <li>
                <a class="nav-link p-0" routerLink="buy" *ngIf="!loginOff">
                    Comprar
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </nav>
    </header>
  `,
})
export class HeaderComponent {

  loginOff: boolean = false;

  constructor(private AuthService: AuthService) {

  }

  ngOnInit(): void {
    this.AuthService.isUserLogin.subscribe({
      next: (isUserLogin: boolean) => {
        this.loginOff = !isUserLogin
      }
    })
  }
  logout()
  {
    this.AuthService.logout()
  }
}
