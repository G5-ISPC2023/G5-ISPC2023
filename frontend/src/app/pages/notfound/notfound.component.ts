import { Component } from '@angular/core';

@Component({
  selector: 'app-notfound',
  template: `
    <div
      class="d-flex min-vh-100 flex-column justify-content-center align-items-center"
    >
      <div
        class="py-1 px-2 d-flex flex-column justify-content-center align-items-center gap-2"
      >
        <h1 class="display-1 fw-bold">404</h1>
        <span class="text-xxl-center fw-bold">Ooops!!</span>
        <p class="text-sm-center text-secondary">Esta página no existe</p>
      </div>
    </div>
  `,
})
export class NotfoundComponent {}
