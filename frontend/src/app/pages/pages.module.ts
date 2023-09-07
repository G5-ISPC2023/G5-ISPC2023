import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LandingPageComponent,
    DashboardComponent
  ]
})
export class PagesModule { }
