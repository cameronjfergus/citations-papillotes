import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListCitesComponent } from './components/list-cites/list-cites.component';
import {HomeComponent} from './components/home/home.component';
import {PageNotFoundComponent} from './components/pageNotFound/page-not-found.component';
import {Cites} from './services/Cites';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListCitesComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    Cites
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
