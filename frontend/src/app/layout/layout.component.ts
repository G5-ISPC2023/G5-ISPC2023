import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <main class="h-100">
      <app-header></app-header>
      <section>
        <router-outlet></router-outlet>
      </section>
      <app-footer></app-footer>
    </main>
  `,
})
export class LayoutComponent {}
