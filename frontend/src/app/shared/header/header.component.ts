import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HEADER_ITEMS } from './header-items.constant';

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
                  >ARGBROKEN.com</a
                >
              </h1>
              <div class="d-flex align-items-center gap-2">
                <div class="d-flex gap-1" *ngIf="userLoged">
                  <span class="fw-bold">{{ username }}</span>
                </div>
                <a
                  class="btn btn-sm"
                  *ngIf="showOpenAccount"
                  routerLink="register"
                >
                  <i class="fa fa-sm fa-user-plus" aria-hidden="true"></i>
                  ABRIR CUENTA
                </a>
                <a class="btn btn-sm btn-primary" [routerLink]="handleRoute()">
                  <i class="fa fa-sm fa-lock" aria-hidden="true"></i>
                  {{ userLoged ? 'Cerrar Sesión' : 'Ingresar' }}
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
                <li class="nav-item" *ngFor="let item of items">
                  <a
                    class="nav-link p-0"
                    [routerLink]="item.path"
                    routerLinkActive="active"
                    >{{ item.label }}</a
                  >
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
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showOpenAccount = event.url === '/';
      }
    });
  }

  userLoged: boolean = false;
  username: string = '';
  showOpenAccount: boolean = false;
  items = HEADER_ITEMS;

  ngOnInit(): void {
    setTimeout(() => {
      this.changeLoged('Mariano Bazan');
    }, 2000);
  }

  changeLoged(username: string) {
    this.userLoged = !this.userLoged;
    this.username = username;
  }

  handleRoute() {
    return this.userLoged ? 'auth/logout' : 'auth/login';
  }
}
