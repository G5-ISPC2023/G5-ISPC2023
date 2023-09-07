import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LayoutComponent } from './layout/layout.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BuyComponent } from './pages/buy/buy.component';
import { CotizacionesComponent } from './pages/cotizaciones/cotizaciones.component';
import { AuthGuard } from './services/auth.guard';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', redirectTo:'/home', pathMatch: 'full'},
      {path: 'home', component: LandingPageComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
      {path: 'buy', component: BuyComponent, canActivate:[AuthGuard]},
      {path: 'cotizaciones', component: CotizacionesComponent},
      {path: 'about', component: AboutComponent}
    ],
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
