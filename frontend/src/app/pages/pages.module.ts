import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyComponent } from './buy/buy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LandingPageComponent,
    BuyComponent,
    CotizacionesComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    LandingPageComponent,
    DashboardComponent,
    BuyComponent,
    CotizacionesComponent,
    AboutComponent
  ]
})
export class PagesModule { }
