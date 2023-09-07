import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { PagesModule } from './pages/pages.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [BrowserModule, AppRoutingModule, LayoutModule, PagesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
